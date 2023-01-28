import django_tables2 as tables
from django.urls import reverse
from django.utils.html import format_html

from core.models import Package


class PackageTable(tables.Table):
    class Meta:
        model = Package
        fields = ("name", "summary")
        attrs = {"class": "table is-hoverable is-fullwidth"}

    def render_name(self, value, record):
        return format_html(
            f'<a href="{reverse("ui:package-detail", kwargs={"pk": record.id})}">'
            f"{value}</a>"
        )
