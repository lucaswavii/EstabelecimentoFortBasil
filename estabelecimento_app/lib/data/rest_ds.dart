import 'dart:async';
import 'dart:convert';
import 'package:estabelecimento_app/model/Establishment.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:estabelecimento_app/model/User.dart';
import 'package:estabelecimento_app/utis/network_utils.dart';

class RestDatasource {

  NetworkUtil _netUtil = new NetworkUtil();

  SharedPreferences sharedPreferences;

  static final BASE_URL = "http://192.168.1.241:3333";



  Future<User> login(String username, String password) async {
    sharedPreferences = await SharedPreferences.getInstance();

    var headers = {"Content-Type": "application/json"};
    var body = {"email": username, "senha": password};

    dynamic res = await _netUtil.post(
        BASE_URL + "/api/login", headers: headers, body: body);

    if (res.length > 0 ) {
      sharedPreferences.setString("id", res[0]["id"].toString());
      sharedPreferences.setString("username", res[0]["email"].toString());
      sharedPreferences.setString("token", res[0]["token"].toString());
      sharedPreferences.commit();
    }
    print(res.toString());
    return new User(username, password);
  }
  Future<List> pegaEstabelecimento() async {
    sharedPreferences = await SharedPreferences.getInstance();
    String auth = sharedPreferences.getString("token");

    dynamic res =  await _netUtil.get(BASE_URL + '/api/estabelecimento', auth);

    List<Establishment> estabeleicmento = [];

    if( res.length > 0 ) {

      for ( var j in res) {
        var id              = j['id'].round().toString();
        var cnpj            = j['cnpj'].toString();
        var razao           = j["razao"].toString();
        var fantasia        = j["fantasia"].toString();


        Establishment p = new Establishment(id,cnpj, razao, fantasia);
        estabeleicmento.add(p);
      }

      return estabeleicmento;

    }
  }
}