'use strict';
var Contact = (function () {
    function Contact(id, firstName, lastName, middleName, gender, mobilePhone, fax, type, status, maritalStatus) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.gender = gender;
        this.mobilePhone = mobilePhone;
        this.fax = fax;
        this.type = type;
        this.status = status;
        this.maritalStatus = maritalStatus;
    }
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.js.map