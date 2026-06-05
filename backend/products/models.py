from django.db import models


class MaterialKind(models.TextChoices):
    """Familias alineadas con el catálogo público (filtrado y edición en admin)."""

    INOXIDABLES = "inoxidables", "Inoxidables"
    ALUMINIOS = "aluminios", "Aluminios"
    ACEROS = "aceros", "Aceros"
    HIERROS_FUNDICION = "hierros_fundicion", "Hierros de fundición"
    BRONCE = "bronce", "Bronce"
    LATON = "laton", "Latón"
    COBRE = "cobre", "Cobre"
    ZINC = "zinc", "Zinc"
    PLASTICOS_MECANIZADOS = "plasticos_mecanizados", "Plásticos mecanizados"
    PLASTICOS_INDUSTRIALES = "plasticos_industriales", "Plásticos industriales"
    SUMINISTROS = "suministros", "Suministros"


class Product(models.Model):
    #main  fields
    title = models.CharField(max_length=255, verbose_name="Nombre del material")
    description = models.TextField(blank=True)
    material_kind = models.CharField(
        max_length=40,
        choices=MaterialKind.choices,
        default=MaterialKind.ACEROS,
        db_index=True,
        verbose_name="Tipo / familia de material",
        help_text="Agrupa el producto en el catálogo (aceros, aluminio, etc.)",
    )
    #easy metadata
    suministros = models.CharField(max_length=255, blank=True)
    #saved files 
    image = models.ImageField(upload_to='products/images/', blank=True, null=True)
    specs = models.JSONField(default=list, help_text="Lista de especificaciones técnicas")
    chemical = models.JSONField(default=dict, help_text="Composición química (C, Mn, Si, etc.)")
    mechanical = models.JSONField(default=dict, help_text="Propiedades mecánicas por diámetro")
    equivalencias = models.JSONField(default=dict, help_text="Normativas internacionales")
    cortes = models.JSONField(default=list, help_text="Formatos disponibles (Redondo, Cuadrado...)")
    gama_medidas = models.JSONField(default=dict, help_text="Rango de dimensiones por tipo")
    def __str__(self):
        return self.title