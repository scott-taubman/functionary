from core.models import Package
from ui.tables.package import PackageTable

from .view_base import (
    PermissionedEnvironmentDetailView,
    PermissionedEnvironmentListView,
)


class PackageListView(PermissionedEnvironmentListView):
    model = Package

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context["table"] = PackageTable(self.get_queryset())

        return context


class PackageDetailView(PermissionedEnvironmentDetailView):
    model = Package

    def get_queryset(self):
        return super().get_queryset().select_related("environment")
