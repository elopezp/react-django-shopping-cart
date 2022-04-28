from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework.response import Response
from rest_framework import serializers, status


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the users object"""

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'name', 'dob', 'gender', 'role')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 5},
            'dob': {'write_only': True},
            'gender': {'write_only': True},
        }

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        try:
            user = get_user_model().objects.create_user(**validated_data)
            return user
        except Exception:
            message = {'detail': _('User with this email already exists')}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

    def update(self, instance, validated_data):
        """Update a user, setting the password correctly and return it"""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs
