from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Expense
from .serializers import ExpenseSerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Optimized access: only current user's expenses, select columns
        return Expense.objects.filter(user=self.request.user).only('id','title','amount','category','date')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def summary_by_category(self, request):
        data = (
            Expense.objects.filter(user=request.user)
            .values('category')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )
        return Response(list(data))
