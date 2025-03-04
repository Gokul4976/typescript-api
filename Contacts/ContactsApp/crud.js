var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var editingId = 0;
var form = document.getElementById("form1");
var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var phoneInput = document.getElementById("phone");
var dobInput = document.getElementById("date");
var balanceInput = document.getElementById("balance");
var selectElement = document.getElementById("multiselect");
form.addEventListener("submit", function (event) { return __awaiter(_this, void 0, void 0, function () {
    var name, email, phone, dob, balance, selectedOption, profilePhotoFile, base64String, contact, contact;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                event.preventDefault();
                name = nameInput.value.trim();
                email = emailInput.value.trim();
                phone = phoneInput.value.trim();
                dob = dobInput.value.trim();
                balance = parseFloat(balanceInput.value.trim());
                selectedOption = Array.from(selectElement.selectedOptions).map(function (option) { return option.value; });
                profilePhotoFile = (_a = document.getElementById("fileInput").files) === null || _a === void 0 ? void 0 : _a[0];
                base64String = "";
                if (!profilePhotoFile) return [3 /*break*/, 2];
                return [4 /*yield*/, convertToBase64(profilePhotoFile)];
            case 1:
                base64String = _b.sent();
                _b.label = 2;
            case 2:
                if (editingId != 0) {
                    contact = { id: editingId, name: name, email: email, phone: phone, dob: dob, languages: selectedOption, balance: balance, photo: [base64String]
                    };
                    updateContact(editingId, contact);
                }
                else {
                    contact = { id: undefined,
                        name: name,
                        email: email, phone: phone, dob: dob, languages: selectedOption, balance: balance, photo: [base64String]
                    };
                    addContact(contact);
                }
                form.reset();
                return [2 /*return*/];
        }
    });
}); });
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('form1');
    renderContacts();
});
function addnewContact() {
    editingId = 0;
    form.reset();
}
//Function to convert file to base64 string
function convertToBase64(file) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var reader = new FileReader();
                    reader.onloadend = function () { return resolve(reader.result); };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                })];
        });
    });
}
function exportToCSV() {
    return __awaiter(this, void 0, void 0, function () {
        var exportData, output, blob, url, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchContacts()];
                case 1:
                    exportData = _a.sent();
                    output = "";
                    exportData.forEach(function (element) {
                        output += element.name + "," + element.email + "," + element.phone + "," + element.dob + "," + element.languages.join("-") + "," + element.balance + "\n";
                    });
                    blob = new Blob([output], { type: 'text/csv' });
                    url = URL.createObjectURL(blob);
                    link = document.createElement('a');
                    link.setAttribute('href', url);
                    link.setAttribute('download', 'contacts.csv');
                    document.body.removeChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [2 /*return*/];
            }
        });
    });
}
function renderContacts() {
    return __awaiter(this, void 0, void 0, function () {
        var tableBody_1, contacts, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    tableBody_1 = document.getElementById('contactTableBody');
                    return [4 /*yield*/, fetchContacts()];
                case 1:
                    contacts = _a.sent();
                    tableBody_1.innerHTML = '';
                    contacts.forEach(function (contact) {
                        var row = document.createElement('tr');
                        row.innerHTML = "\n            <td> ".concat(contact.name, " </td>\n            <td> ").concat(contact.email, " </td>\n            <td> ").concat(contact.phone, " </td>\n            <td> ").concat(contact.dob.split('T')[0].split('-').reverse().join('/'), " </td>\n            <td> ").concat(contact.languages.join(', '), " </td>\n            <td> ").concat(contact.balance, " </td>\n            <td><img src=\"").concat(contact.photo[0], "\" style =\" width:100px;height:auto;\" alt=\"Photo\"></td>\n            <td>\n            <button onclick=\"editContact('").concat(contact.id, "')\">Edit</button>\n            <button onclick=\"deleteContact('").concat(contact.id, "')\">Delete</button>\n            </td>\n            ");
                        tableBody_1.appendChild(row);
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching contaccts:', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var url = 'http://localhost:5229';
function editContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        var contaccts, contact, dobData, formattedDOB, format, i, languaageOption;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    editingId = parseInt(id);
                    return [4 /*yield*/, fetchContacts()];
                case 1:
                    contaccts = _a.sent();
                    contact = contaccts.find(function (contact) { return contact.id == editingId; });
                    if (contact) {
                        document.getElementById('name').value = contact.name;
                        nameInput.value = contact.name;
                        emailInput.value = contact.email;
                        phoneInput.value = contact.phone;
                        dobData = new Date(contact.dob);
                        formattedDOB = dobData.toLocaleDateString("es-CL").split("-");
                        format = formattedDOB[2] + '-' + formattedDOB[1] + "-" + formattedDOB[0];
                        dobInput.value = format;
                        //multi select element
                        if (contact.languages.length > 0) {
                            //set the value of slect element to first languaage in array
                            selectElement.value = contact.languages[0];
                            //if there are multiple language you may want to select optionns
                            for (i = 1; i < contact.languages.length; i++) {
                                languaageOption = selectElement.querySelector("option[value=\"".concat(contact.languages[i], "\"]"));
                                if (languaageOption) {
                                    languaageOption.selected = true;
                                }
                            }
                        }
                        else {
                            //if no languages are specified you may wnat to set a default option or handle it differently
                            selectElement.value = ""; //or some default value
                        }
                        balanceInput.value = contact.balance.toString();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
//   const url='http://localhost:5229';
function fetchContacts() {
    return __awaiter(this, void 0, void 0, function () {
        var apiUrl, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiUrl = "".concat(url, "/api/contacts");
                    return [4 /*yield*/, fetch(apiUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to fetcch contacts');
                    }
                    return [4 /*yield*/, response.json()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function addContact(contact) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/api/contacts"), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to add contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
function updateContact(id, contact) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/api/Contacts/").concat(id), {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(contact)
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('failed to update contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
function deleteContact(id) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url, "/api/Contacts/").concat(id), {
                        method: 'DELETE'
                    })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('failed to delete contact');
                    }
                    renderContacts();
                    return [2 /*return*/];
            }
        });
    });
}
