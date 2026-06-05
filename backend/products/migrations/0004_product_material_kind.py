# Generated manually for MATERIAL_KIND taxonomy

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_remove_product_name_remove_product_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='material_kind',
            field=models.CharField(
                choices=[
                    ('inoxidables', 'Inoxidables'),
                    ('aluminios', 'Aluminios'),
                    ('aceros', 'Aceros'),
                    ('hierros_fundicion', 'Hierros de fundición'),
                    ('bronce', 'Bronce'),
                    ('laton', 'Latón'),
                    ('cobre', 'Cobre'),
                    ('zinc', 'Zinc'),
                    ('plasticos_mecanizados', 'Plásticos mecanizados'),
                    ('plasticos_industriales', 'Plásticos industriales'),
                    ('suministros', 'Suministros'),
                ],
                db_index=True,
                default='aceros',
                help_text='Agrupa el producto en el catálogo (aceros, aluminio, etc.)',
                max_length=40,
                verbose_name='Tipo / familia de material',
            ),
        ),
    ]
