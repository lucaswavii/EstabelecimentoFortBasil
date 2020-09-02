import 'package:estabelecimento_app/view/estabelecimento/establishment_screen.dart';
import 'package:estabelecimento_app/view/home/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:estabelecimento_app/view/login/login_screen.dart';

final routes = {
  '/' : (BuildContext context) => new LoginScreen(),
  '/home' : (BuildContext context) => new HomeScreen(),
  '/estabelecimento' : (BuildContext context) => new EstablishmentScreen(),
};