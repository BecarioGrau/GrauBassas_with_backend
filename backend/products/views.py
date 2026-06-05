from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import MaterialKind, Product
from .serializers import ProductSerializer


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):

        # 👀 CUALQUIERA puede ver
        if request.method in permissions.SAFE_METHODS:
            return True

        # 🔐 SOLO admin puede modificar
        return request.user and request.user.is_staff


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminOrReadOnly]

    def get_queryset(self):
        qs = Product.objects.all()
        kind = self.request.query_params.get("material_kind")
        if kind and kind in MaterialKind.values:  # Django TextChoices enum values
            qs = qs.filter(material_kind=kind)
        return qs.order_by("material_kind", "title")

    def create(self, request, *args, **kwargs):
        # Verifica si recibimos una lista de objetos o uno solo
        is_many = isinstance(request.data, list)
        
        # Pasamos many=True si es una lista para que el serializer lo procese correctamente
        serializer = self.get_serializer(data=request.data, many=is_many)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['get'], permission_classes=[permissions.AllowAny])
    def me(self, request):
        return Response({
            "is_authenticated": request.user.is_authenticated,
            "is_staff": request.user.is_staff if request.user.is_authenticated else False,
            "username": request.user.username if request.user.is_authenticated else None
        })
