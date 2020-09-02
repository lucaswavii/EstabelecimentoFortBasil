class Establishment {
  String _id;
  String _cnpj;
  String _razao;
  String _fantasia;
  Establishment(this._id, this._cnpj, this._razao, this._fantasia);

  Establishment.map(dynamic obj) {
    this._id = obj["id"];
    this._cnpj = obj["cnpj"];
    this._razao = obj["razao"];
    this._fantasia = obj["fantasia"];

  }

  String get id => _id;
  String get cnpj => _cnpj;
  String get razao => _razao;
  String get fantasia => _fantasia;

  Map<String, dynamic> toMap() {
    var map = new Map<String, dynamic>();
    map["id"] = _id;
    map["cnpj"] = _cnpj;
    map["razao"] = _razao;
    map["fantasia"] = _fantasia;

    return map;
  }
}