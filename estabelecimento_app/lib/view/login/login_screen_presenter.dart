import 'package:estabelecimento_app/data/rest_ds.dart';
import 'package:estabelecimento_app/model/User.dart';
import 'package:estabelecimento_app/data/database_helper.dart';
import 'package:shared_preferences/shared_preferences.dart';

abstract class LoginScreenContract {
  void onLoginSuccess(User user);
  void onLoginError(String errorTxt);
}

class LoginScreenPresenter {
  LoginScreenContract _view;
  RestDatasource api = new RestDatasource();
  SharedPreferences sharedPreferences;
  LoginScreenPresenter(this._view);

  doLogin(String username, String password) async {
    try {
      sharedPreferences = await SharedPreferences.getInstance();

      User user = await api.login(username, password);
      processLoginSuccess(user);
    } catch( error ) {
      _view.onLoginError(error.toString());
    }
  }

  void processLoginSuccess(User user) async {
    var db = new DatabaseHelper();
    await db.saveUser(user);
    _view.onLoginSuccess(user);
  }
}