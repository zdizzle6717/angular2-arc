'use strict';
var Provider = (function () {
    function Provider(id, name, dba, email, identifier, identifierType, legalName, phone, providerNumber, state) {
        this.id = id;
        this.name = name;
        this.dba = dba;
        this.email = email;
        this.identifier = identifier;
        this.identifierType = identifierType;
        this.legalName = legalName;
        this.phone = phone;
        this.providerNumber = providerNumber;
        this.state = state;
    }
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map