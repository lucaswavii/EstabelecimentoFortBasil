import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:estabelecimento_app/auth.dart';
import 'package:estabelecimento_app/model/User.dart';
import 'package:estabelecimento_app/view/login/login_screen_presenter.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new LoginScreenState();
  }
}

class LoginScreenState extends State<LoginScreen>
    implements LoginScreenContract, AuthStateListener {
  TextStyle style = TextStyle(fontFamily: 'Montserrat', fontSize: 20.0);

  BuildContext _ctx;

  bool _isLoading = false;
  final formKey = new GlobalKey<FormState>();
  final scaffoldKey = new GlobalKey<ScaffoldState>();
  String _username, _password;
  bool checkValue = false;

  LoginScreenPresenter _presenter;

  LoginScreenState() {
    _presenter = new LoginScreenPresenter(this);
    var authStateProvider = new AuthStateProvider();
    authStateProvider.subscribe(this);
  }

  void _submit() {
    final form = formKey.currentState;

    if (form.validate()) {
      setState(() => _isLoading = true);
      form.save();
      _presenter.doLogin(_username, _password);
    }
  }

  void _showSnackBar(String text) {
    scaffoldKey.currentState
        .showSnackBar(new SnackBar(content: new Text(text)));
  }

  @override
  onAuthStateChanged(AuthState state) {
    if (state == AuthState.LOGGED_IN)
      Navigator.of(_ctx).pushReplacementNamed("/home");
  }

  @override
  Widget build(BuildContext context) {
    _ctx = context;

    final loginBtn = Material(
      elevation: 5.0,
      borderRadius: BorderRadius.circular(15.0),
      color: Color(0xFF9F0000),
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: _submit,
        child: Text("Entrar",
            textAlign: TextAlign.center,
            style: style.copyWith(
                color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );

    var loginForm = new Column(
      children: <Widget>[
        SizedBox(
          height: 155.0,
          child: Image.asset(
            "assets/cvi_logo.png",
            fit: BoxFit.contain,
          ),
        ),
        new Form(
          key: formKey,
          child:  new Column(
            children: <Widget>[
              new Padding(
                padding: const EdgeInsets.all(8.0),
                child: new TextFormField(
                  onSaved: (val) => _username = val,
                  validator: (val) {
                    return val.length == 0 ? "Usuário Não Informado." : null;
                  },

                  decoration: InputDecoration(

                      contentPadding:
                      EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      hintText: "Usuário",
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15.0))),
                ),
              ),
              new Padding(
                padding: const EdgeInsets.all(8.0),
                child: new TextFormField(
                  onSaved: (val) => _password = val,
                  obscureText: true,
                  style: style,
                  validator: (val) {
                    return val.length == 0 ? "Senha Não Informado." : null;
                  },
                  decoration: InputDecoration(
                      contentPadding:
                      EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      hintText: "Senha",
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(15.0))),
                ),
              ),
              new Padding(
                padding: const EdgeInsets.all(8.0),
                child: new CheckboxListTile(
                  value: checkValue,
                  //onChanged: null,
                  title: new Text("Lembra Usuário?"),
                  controlAffinity: ListTileControlAffinity.leading,
                ),
              ),
            ],
          ),
        ),
        _isLoading ? new CircularProgressIndicator() : loginBtn
      ],
      crossAxisAlignment: CrossAxisAlignment.center,
    );

    return new Scaffold(
      appBar: null,
      key: scaffoldKey,
      body: new Container(
        decoration: new BoxDecoration(
          image: new DecorationImage(
              image: new AssetImage("assets/backgrou.jpg"), fit: BoxFit.cover),
        ),
        child: new Center(
          child: new ClipRect(
            child: new BackdropFilter(
              filter: new ImageFilter.blur(sigmaX: 10.0, sigmaY: 10.0),
              child: new Container(
                child: loginForm,
                height: 450.0,
                width: 350.0,
              ),
            ),
          ),
        ),
      ),
    );
  }

  @override
  void onLoginError(String errorTxt) {
    _showSnackBar(errorTxt);
    setState(() => _isLoading = false);
  }

  @override
  void onLoginSuccess(User user) async {
    _showSnackBar(user.toString());
    setState(() => _isLoading = false);
    var authStateProvider = new AuthStateProvider();
    authStateProvider.notify(AuthState.LOGGED_IN);
  }
}
