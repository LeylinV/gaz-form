import {serialize} from 'object-to-formdata';
import cleaner from 'deep-cleaner';

export default {
    namespaced: true,
    actions: {
        //В режиме редактирования http://localhost:8080/contract/request/emptyapplication/48/edit/?id=48
        async show(_c, {id}) {
            return {
                "request": {
                    "id": "48",
                    "id_1c": "",
                    "contractor_id": "",
                    "contract_id": "",
                    "connection_point_id": "",
                    "connection_id": "",
                    "area_id": "",
                    "type": 38,
                    "status": "Черновик",
                    "eds_date": 0,
                    "comment": "Текст",
                    "create_date": 1689310777,
                    "files": [
                        157
                    ],
                    "eds": "",
                    "data": {
                        "type": "38",
                        "last_name": "Иванов",
                        "name": "Иван",
                        "second_name": "Иванович",
                        "snils": "111-111-111-11",
                        "phone": "+79171234567",
                        "email": "ivanov@test.ru",
                        "account": "72",
                        "address": "Ул. Новосибирская 4к2",
                        "comment": "Текст",
                        "agree": "yes",
                        "emailme": "no",
                        "files": [
                            157
                        ]
                    },
                    "user": "1",
                    "applicant_changed_date": 1689311512,
                    "return_reason": "",
                    "can_write_message": "",
                    "send_date": 0
                }
            }
        },
        async getFilesData(_c, {file}) {
            return [
                {
                    "id": 157,
                    "bx_id": 323,
                    "read_only": 0,
                    "src": "/upload/uf/d4b/kqe7os8g9qjf1jsyrcyn532xajxsamey.jpeg",
                    "name": "kqe7os8g9qjf1jsyrcyn532xajxsamey.jpeg",
                    "original_name": "photo1689241692.jpeg",
                    "type": "image/jpeg",
                    "size": "153336"
                }
            ]
        },
        async getUserData() {
            return {
                "email": "ivanov@test.ru",
                "name": "Иван",
                "last_name": "Иванов",
                "second_name": "Иванович",
                "phone": "+79171234567"
            }
        },
        async getAccounts() {
            return [
                {
                    "label": "12345678",
                    "value": "72"
                },
                {
                    "label": "11223344",
                    "value": "2"
                }
            ]
        },
        async getRequestTypes() {
            return [
                {
                    "label": "Свободная форма",
                    "value": "1"
                },
                {
                    "label": "Справка о расчетах (задолженности) за сетевой газ",
                    "value": "2"
                },
                {
                    "label": "Перерасчет по фактическому потреблению газа",
                    "value": "3"
                },
                {
                    "label": "Направление контролера",
                    "value": "4"
                },
                {
                    "label": "О поверке",
                    "value": "5"
                },
                {
                    "label": "Уведомление о непредоставлении сведений о показаниях ПУГ (счетчика газа)",
                    "value": "6"
                },
                {
                    "label": "Об опломбировке ПУГ (счетчика газа)",
                    "value": "7"
                },
                {
                    "label": "Уведомление о неисправности ПУГ (счетчика газа)",
                    "value": "8"
                },
                {
                    "label": "О возобновлении поставки газа",
                    "value": "9"
                },
                {
                    "label": "О поэтапном погашении задолженности",
                    "value": "10"
                },
            ]
        },
        async getVerificationTypes() {
            return [
                {
                    "label": "до истечения межповерочного периода",
                    "value": "1"
                },
                {
                    "label": "после истечения межповерочного периода",
                    "value": "2"
                },
            ]
        },
        async getReasonForSealingTypes() {
            return [
                {
                    "label": "первичная установка прибора учета газа",
                    "value": "1"
                },
                {
                    "label": "установка прибора учета газа после его демонтажа для проведения проверки",
                    "value": "2"
                },
                {
                    "label": "установка прибора учета газа после его демонтажа для проведения ремонта",
                    "value": "3"
                },
                {
                    "label": "замена прибора учета газа",
                    "value": "4"
                },
                {
                    "label": "повреждение ранее установленных пломб",
                    "value": "5"
                },

            ]
        },
        async getCounterPlaceTypes() {
            return [
                {
                    "label": "в отапливаемом помещении",
                    "value": "1"
                },
                {
                    "label": "в неотапливаемом помещении",
                    "value": "2"
                },
                {
                    "label": "вне помещения",
                    "value": "3"
                },
            ]
        },
        async getDefectTypes() {
            return [
                {
                    "label": "погасло электронное табло",
                    "value": "1"
                },
                {
                    "label": "повреждения корпуса",
                    "value": "2"
                },
                {
                    "label": "повреждения счетного механизма",
                    "value": "3"
                },
                {
                    "label": "прочее",
                    "value": "4"
                },
            ]
        },
        async getSubjectApplicationTypes() {
            return [
                {
                    "label": "не производить приостановление подачи газа",
                    "value": "1"
                },
                {
                    "label": "согласовать возобновление подачи газа",
                    "value": "2"
                },
            ]
        },
        async getDebtPercentageTypes() {
            return [
                {
                    "label": "50%",
                    "value": "1"
                },
                {
                    "label": "60%",
                    "value": "2"
                },
                {
                    "label": "70%",
                    "value": "3"
                },
            ]
        },
        async getAccountAddress(_c, {accountID}) {
            const addresses = {
                72: "Ул. Новосибирская 4к2",
                2: "Ул. Уфимская 4к2"
            }
            return addresses[accountID];
        },
        async create(_c, opts) {

            const {
                edit = false,
                social = false,
                data,
                meta: {is_draft, is_sign, is_letter, request_id},
            } = opts;

            const {comment, files, ...other} = data;

            const cleanedData = cleaner(other);

            const json = {
                comment,
                files,
                request_id,
                is_draft,
                is_sign,
                is_letter,
                data: cleanedData,
            };

            if (edit) json.id = opts.id;

            const formData = serialize(
                json,
                {indices: true, allowEmptyArrays: true}
            );

            alert(JSON.stringify(json, null, 2))

            return {
                "errors": [],
                "error_access": false,
                "id": 51,
            }

        },
    },
};
