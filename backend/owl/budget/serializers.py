# budget/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Expense

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ExpenseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Expense
        fields = ['id', 'amount', 'category', 'date', 'description']
        # Optionally exclude 'user' from the serialized output since it's set by the view
        # extra_kwargs = {'user': {'write_only': True}}

    def create(self, validated_data):
        category_data = validated_data.pop('category')
        category, _ = Category.objects.get_or_create(
            name=category_data['name'],
            user=self.context['request'].user
        )
        # Remove the explicit 'user' assignment here
        expense = Expense.objects.create(
            category=category,
            **validated_data
        )
        return expense

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        if category_data:
            category, _ = Category.objects.get_or_create(
                name=category_data['name'],
                user=self.context['request'].user
            )
            instance.category = category
        instance.amount = validated_data.get('amount', instance.amount)
        instance.date = validated_data.get('date', instance.date)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance