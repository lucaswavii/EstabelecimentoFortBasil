import 'dart:io';
import 'package:estabelecimento_app/view/estabelecimento/establishment_screen.dart';
import 'package:flutter/material.dart';
import 'package:estabelecimento_app/model/User.dart';
import 'package:estabelecimento_app/view/home/home_screen_presenter.dart';

class MenuItem {
  String titulo;
  IconData icon;
  MenuItem(this.titulo, this.icon);
}

class HomeScreen extends StatefulWidget {


  final menuItens = [
    new MenuItem("HOME", Icons.home),
    new MenuItem("ESTABELECIMENTO", Icons.business),
    new MenuItem("SAIR", Icons.exit_to_app)
  ];


  @override
  State<StatefulWidget> createState() {
    return new HomeScreenState();
  }
}

class HomeScreenState extends State<HomeScreen> implements HomeScreenContract {

  HomeScreenPresenter _presenter;
  String _homeText;

  HomeScreenState() {
    _presenter = new HomeScreenPresenter(this);
    _presenter.getUserInfo();
  }

  _itemSelecionado(int item) {
    setState(() {
      _selecionado = item;
    });
    Navigator.of(context).pop();
  }

  _menuItem() {
    List<Widget> menu = <Widget>[];
    for(var i = 0; i < widget.menuItens.length; i++) {
      var item = widget.menuItens[i];
      menu.add(new ListTile(
        leading: new Icon(item.icon),
        title: new Text(item.titulo),
        selected: i == _selecionado,
        onTap: () => _itemSelecionado(i),
      ));
    }
    return menu;
  }

  int _selecionado = 0;
  _carregaFragmento(int carrega) {
    switch(carrega) {
      case 0: return null;
      case 1: return EstablishmentScreen();
      case 1: return exit(0);
      default: return new Text('Essa página não existe');
    }
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("App Estabelecimento"),
        backgroundColor: new Color(0xFFD50000),
      ),
      drawer: new Drawer(
        child: new Column(
          children: <Widget>[
            new UserAccountsDrawerHeader(
                accountName: new Text(_homeText),
                ///   accountName: new Text("Usuário"),
                currentAccountPicture: new CircleAvatar(
                  backgroundImage: AssetImage("assets/avatar.png"),
                ),
                decoration: new BoxDecoration(
                    image: new DecorationImage(
                        colorFilter: ColorFilter.mode(Colors.black87,
                            BlendMode.multiply),
                        fit: BoxFit.fill,
                        image: AssetImage("assets/cvi_logo.png")
                    )
                ),
                accountEmail: new Text("App Estabelecimento")),
            new Column(
              children: _menuItem(),
            )
          ],
        ),
      ),
      body: _carregaFragmento(_selecionado),


    );
  }

  @override
  void onDisplayUserInfo(User user) {
    setState(() {
      _homeText = 'Olá Sr(a) ${ user.username }';
    });
  }

  @override
  void onErrorUserInfo() {
    setState(() {
      _homeText = 'There was an error retrieving user info';
    });
  }

}