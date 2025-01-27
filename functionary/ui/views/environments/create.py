from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.shortcuts import get_object_or_404
from django.urls import reverse
from django.views.generic import CreateView

from core.auth import Permission
from core.models import Environment, EnvironmentUserRole, User
from ui.forms.environments import EnvironmentUserRoleForm

from .utils import get_user_role


class EnvironmentUserRoleCreateView(
    LoginRequiredMixin, UserPassesTestMixin, CreateView
):
    model = EnvironmentUserRole
    form_class = EnvironmentUserRoleForm
    template_name = "forms/environment/environmentuserrole_create.html"

    def get_success_url(self) -> str:
        return reverse(
            "ui:environment-detail", kwargs={"pk": self.kwargs.get("environment_id")}
        )

    def get_context_data(self, *args, **kwargs) -> dict:
        context = super().get_context_data(*args, **kwargs)
        user_id = self.request.GET.get("user_id")
        environment_id = self.kwargs.get("environment_id")
        user = get_object_or_404(User, id=user_id) if user_id else None

        context["environment_id"] = environment_id
        context["user_id"] = user_id
        context["username"] = user.username if user_id else None
        return context

    def get_initial(self) -> dict:
        """Replace role in form with the user's effective role for the environment"""
        initial = super().get_initial()
        user_id = self.request.GET.get("user_id")
        if not user_id:
            return initial

        environment_id = self.kwargs.get("environment_id")
        user = get_object_or_404(User, id=user_id)
        environment = get_object_or_404(Environment, id=environment_id)
        user_role, _ = get_user_role(user, environment)
        initial["role"] = user_role.role if user_role else None
        return initial

    def test_func(self) -> bool:
        environment = get_object_or_404(Environment, id=self.kwargs["environment_id"])
        return self.request.user.has_perm(Permission.ENVIRONMENT_UPDATE, environment)
