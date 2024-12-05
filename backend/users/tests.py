from django.test import TestCase
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

# Create your tests here.

class CustomUserTests(TestCase):
  
  def test_new_superuser(self):
    custom_user = get_user_model()
    superuser = custom_user.objects.create_superuser(
      phone_number='0123456789', username='superuser_test'
    )
    self.assertEqual(superuser.phone_number, '0123456789')
    self.assertEqual(superuser.username, 'superuser_test')
    self.assertTrue(superuser.is_superuser)
    self.assertTrue(superuser.is_staff)
    self.assertEqual(str(superuser), '0123456789')
    
    with self.assertRaises(ValidationError):
      custom_user.objects.create_superuser(
        phone_number='phone_num_err_test',
        username='superuser_test'
      )
      
    with self.assertRaises(ValidationError):
      custom_user.objects.create_superuser(
        phone_number='0555555555',
        username='superuser_test'
      )
      
    with self.assertRaises(ValidationError):
      custom_user.objects.create_superuser(
        phone_number='01234567890123',
        username='superuser_test'
      )
      
    with self.assertRaises(ValueError):
      custom_user.objects.create_superuser(
        phone_number='0123456789',
        username='superuser_test',
        is_superuser=False
      )
      
    with self.assertRaises(ValueError):
      custom_user.objects.create_superuser(
        phone_number='phone_num_err_test',
        username='superuser_test',
        is_staff=False
      )
      
  def test_new_user(self):
    custom_user = get_user_model()
    user = custom_user.objects.create_user(
      phone_number='0987654321',
    )
    
    self.assertEqual(user.phone_number, '0987654321')
    self.assertFalse(user.is_superuser)
    self.assertFalse(user.is_staff)
    self.assertEqual(str(user), '0987654321')
    
    with self.assertRaises(ValueError):
      custom_user.objects.create_user(
        phone_number=''
      )
    
    with self.assertRaises(ValidationError):
      custom_user.objects.create_user(
        phone_number='phone_num_err_test'
      )
    
    with self.assertRaises(ValidationError):
      custom_user.objects.create_user(
        phone_number='0555555555'
      )
      
    with self.assertRaises(ValidationError):
      custom_user.objects.create_user(
        phone_number='01234567890123'
      )
      
    with self.assertRaises(ValueError):
      custom_user.objects.create_user(
        phone_number='0123456789',
        is_superuser=True
      )
      
    with self.assertRaises(ValueError):
      custom_user.objects.create_user(
        phone_number='0123456789',
        is_staff=True
      )