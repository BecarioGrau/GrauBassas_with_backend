import json
from pathlib import Path

from django.core.management.base import BaseCommand

from products.models import MaterialKind, Product

# Archivos JSON en frontend/public/data → material_kind en Django
JSON_FILES = {
    "aceros.json": MaterialKind.ACEROS,
    "aluminios.json": MaterialKind.ALUMINIOS,
    "inoxidables.json": MaterialKind.INOXIDABLES,
    "bronce.json": MaterialKind.BRONCE,
    "laton.json": MaterialKind.LATON,
    "cobre.json": MaterialKind.COBRE,
    "zinc.json": MaterialKind.ZINC,
    "hierros_fundidos.json": MaterialKind.HIERROS_FUNDICION,
}

# backend/products/management/commands/ → raíz del repo
DATA_DIR = Path(__file__).resolve().parents[4] / "frontend" / "public" / "data"


class Command(BaseCommand):
    help = "Importa productos desde los JSON estáticos de frontend/public/data"

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Elimina productos existentes antes de importar",
        )

    def handle(self, *args, **options):
        if options["clear"]:
            deleted, _ = Product.objects.all().delete()
            self.stdout.write(self.style.WARNING(f"Eliminados {deleted} productos."))

        created = 0
        updated = 0

        for filename, material_kind in JSON_FILES.items():
            path = DATA_DIR / filename
            if not path.exists():
                self.stdout.write(self.style.WARNING(f"No existe: {path}"))
                continue

            with path.open(encoding="utf-8") as f:
                items = json.load(f)

            if not isinstance(items, list):
                self.stdout.write(self.style.ERROR(f"{filename}: no es una lista"))
                continue

            for item in items:
                title = (item.get("title") or "").strip()
                if not title:
                    continue

                defaults = {
                    "description": item.get("description", ""),
                    "material_kind": material_kind,
                    "suministros": item.get("suministro")
                    or item.get("suministros")
                    or "",
                    "specs": item.get("specs") or [],
                    "chemical": item.get("chemical") or {},
                    "mechanical": item.get("mechanical") or {},
                    "equivalencias": item.get("equivalencias") or {},
                    "cortes": item.get("cortes") or [],
                    "gama_medidas": item.get("gama_medidas") or {},
                }

                _, was_created = Product.objects.update_or_create(
                    title=title,
                    material_kind=material_kind,
                    defaults=defaults,
                )
                if was_created:
                    created += 1
                else:
                    updated += 1

            self.stdout.write(f"  {filename}: {len(items)} entradas procesadas")

        self.stdout.write(
            self.style.SUCCESS(
                f"Importación completada. Creados: {created}, actualizados: {updated}"
            )
        )
