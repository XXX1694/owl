from rest_framework import serializers
from .models import Expense, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ExpenseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Expense
        fields = ['id', 'amount', 'category', 'date', 'description']

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(name=category_data['name'], user=self.context['request'].user)
        expense = Expense.objects.create(category=category, user=self.context['request'].user, **validated_data)
        return expense