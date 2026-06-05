from django.contrib import admin

from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "material_kind", "suministros")
    list_filter = ("material_kind",)
    search_fields = ("title", "description")
