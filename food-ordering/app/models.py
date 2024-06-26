# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Announcement(models.Model):
    announcement_id = models.AutoField(primary_key=True)
    user = models.ForeignKey('StaffIsManager', models.DO_NOTHING)
    date = models.DateTimeField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'announcement'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Combo(models.Model):
    combo_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'combo'


class ComboTag(models.Model):
    combo = models.OneToOneField(Combo, models.DO_NOTHING)
    tag = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'combo_tag'


class Comment(models.Model):
    comment_id = models.AutoField(primary_key=True)
    description = models.TextField(blank=True, null=True)
    commenter_name = models.CharField(max_length=255, blank=True, null=True)
    like_reaction = models.IntegerField(blank=True, null=True)
    dislike_reaction = models.IntegerField(blank=True, null=True)
    original_comment = models.ForeignKey('self', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class CustomerCombo(models.Model):
    user = models.OneToOneField('UserIsCustomer', models.DO_NOTHING)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)
    creation_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_combo'


class CustomerComboIncludesFood(models.Model):
    food = models.OneToOneField('Food', models.DO_NOTHING)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)
    creation_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_combo_includes_food'


class CustomerCreatesOrdering(models.Model):
    user = models.OneToOneField('UserIsCustomer', models.DO_NOTHING)
    ordering = models.OneToOneField('Ordering', models.DO_NOTHING)
    delivery_time = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_creates_ordering'


class CustomerReservationRestaurantCreates(models.Model):
    user = models.OneToOneField('UserIsCustomer', models.DO_NOTHING)
    reservation = models.OneToOneField('Reservation', models.DO_NOTHING)
    restaurant = models.OneToOneField('Restaurant', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'customer_reservation_restaurant_creates'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Food(models.Model):
    food_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    nutrition_value = models.TextField(blank=True, null=True)
    type = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'food'


class FoodHasPromotion(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    promotion = models.OneToOneField('Promotion', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'food_has_promotion'


class FoodIncludesCombo(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    combo = models.OneToOneField(Combo, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'food_includes_combo'


class FoodTag(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    tag = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'food_tag'


class Ordering(models.Model):
    ordering_id = models.AutoField(primary_key=True)
    orderer_name = models.CharField(max_length=255, blank=True, null=True)
    phone_num = models.IntegerField(blank=True, null=True)
    receive_address = models.CharField(max_length=255, blank=True, null=True)
    review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ordering'


class OrderingHasFood(models.Model):
    ordering = models.OneToOneField(Ordering, models.DO_NOTHING)
    food = models.OneToOneField(Food, models.DO_NOTHING)
    amount = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ordering_has_food'


class Promotion(models.Model):
    promotion_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    decrease_price = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'promotion'


class Reservation(models.Model):
    reservation_id = models.AutoField(primary_key=True)
    customer_name = models.CharField(max_length=255, blank=True, null=True)
    phone_num = models.IntegerField(blank=True, null=True)
    eat_time = models.DateTimeField(blank=True, null=True)
    num_of_people = models.IntegerField(blank=True, null=True)
    review = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation'


class ReservationServiceUses(models.Model):
    reservation = models.OneToOneField(Reservation, models.DO_NOTHING)
    service = models.OneToOneField('Service', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'reservation_service_uses'


class ReservationTable(models.Model):
    reservation = models.OneToOneField(Reservation, models.DO_NOTHING)
    table_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_table'


class ReservationVip(models.Model):
    reservation = models.OneToOneField(Reservation, models.DO_NOTHING)
    table_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reservation_vip'


class Restaurant(models.Model):
    restaurant_id = models.AutoField(primary_key=True)
    hotline = models.IntegerField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'restaurant'


class RestaurantServesFood(models.Model):
    food = models.OneToOneField(Food, models.DO_NOTHING)
    restaurant = models.OneToOneField(Restaurant, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'restaurant_serves_food'


class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    service_name = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'service'


class StaffIsManager(models.Model):
    user = models.OneToOneField('UserIsStaff', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'staff_is_manager'


class StartingReservation(models.Model):
    id = models.BigAutoField(primary_key=True)
    customer_name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'starting_reservation'


class StartingUser(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.IntegerField()
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=254)

    class Meta:
        managed = False
        db_table = 'starting_user'


class User(models.Model):
    user_id = models.AutoField(primary_key=True)  # The composite primary key (user_id, phone_num) found, that is not supported. The first column is selected.
    phone_num = models.IntegerField(unique=True)
    password = models.CharField(max_length=255)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'
        unique_together = (('user_id', 'phone_num'),)


class UserIsCustomer(models.Model):
    user = models.OneToOneField(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_is_customer'


class UserIsStaff(models.Model):
    user = models.OneToOneField(User, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'user_is_staff'
