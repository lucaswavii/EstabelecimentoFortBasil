import 'package:flutter/material.dart';
import 'package:estabelecimento_app/model/Establishment.dart';
import 'package:estabelecimento_app/view/estabelecimento/establishment_screen_presenter.dart';

class EstablishmentScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new EstablishmentScreenState();
  }
}

class EstablishmentScreenState extends State<EstablishmentScreen>
    implements EstablishmentScreenContract {
  List<Establishment> _list = [];

  EstablishmentScreenPresenter _presenter;

  EstablishmentScreenState() {
    _presenter = new EstablishmentScreenPresenter(this);
    _presenter.getListEstablishment();
  }

  _carregarListTitle(BuildContext ctxt, Establishment establishment) {
    return Card(
      elevation: 8.0,
      margin: new EdgeInsets.symmetric(horizontal: 10.0, vertical: 6.0),
      child: Container(
        decoration: BoxDecoration(color: Color.fromRGBO(64, 75, 96, .9)),
        child: ListTile(
            contentPadding:
                EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
            onTap: () {
            },
            leading: Container(
              padding: EdgeInsets.only(right: 12.0),
              decoration: new BoxDecoration(
                  border: new Border(
                      right:
                          new BorderSide(width: 1.0, color: Colors.white24))),
              child: Icon(Icons.business, color: Colors.white),
            ),
            title: Text(
              establishment.fantasia,
              style:
                  TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
            // subtitle: Text("Intermediate", style: TextStyle(color: Colors.white)),

            subtitle: Row(
              children: <Widget>[
                Text("id:" + establishment.id,  style: TextStyle(color: Colors.white)),
                Text("fantasia: " + establishment.fantasia, style: TextStyle(color: Colors.white)),
              ],
            ),
            trailing:
                Icon(Icons.border_color, color: Colors.white, size: 30.0)),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new ListView.builder(
        itemCount: _list.length,
        itemBuilder: (BuildContext ctxt, int index) {
          return _carregarListTitle(context, _list[index]);
        });
  }

  @override
  void onPermitsError(String errorTxt) {
    // TODO: implement onPermitsError
  }

  @override
  void onPermitsSuccess(List establish) {
    // TODO: implement onPermitsSuccess
    setState(() {
      _list = establish;
    });
  }
}
