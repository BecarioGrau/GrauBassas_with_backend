# api/serializers.py
import json
from django.http import QueryDict
from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

    # Esto asegura que si llega un String de un JSONField, se convierta en objeto antes de guardar
    def to_internal_value(self, data):
        # request.data puede ser QueryDict (multipart/form-data). Si reasignamos
        # objetos sobre QueryDict, Django los vuelve string; usamos dict plano.
        if isinstance(data, QueryDict):
            data = {key: values[-1] if values else None for key, values in data.lists()}
        else:
            data = data.copy()
        for field in ['specs', 'chemical', 'mechanical', 'equivalencias', 'cortes', 'gama_medidas']:
            if field in data and isinstance(data[field], str):
                try:
                    data[field] = json.loads(data[field])
                except ValueError:
                    pass
        return super().to_internal_value(data)