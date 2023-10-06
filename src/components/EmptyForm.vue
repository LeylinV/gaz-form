<template>
  <div>
    <form>
      <AppFieldset>
        <Alert>Перед заполнением формы заявления убедитесь в том, что лицевой счет привязан к данной учетной записи!<br><br>Обращаем Ваше внимание на то, что подача онлайн-заявления потребует его подписания с помощью мобильного приложения Госключ!</Alert>
        <AppInput name="uploaded_files" type="hidden" />
        <AppSelect
            name="type"
            rules="required"
            label="Тип заявления"
            :options="typeOptions"
            @selectFromSelect="GetTypeSelected"
        />
        <AppInput name="last_name" rules="required" label="Фамилия" />
        <AppInput name="name" rules="required" label="Имя" />
        <AppInput name="second_name" label="Отчество" />
        <AppInput name="snils" rules="required" label="СНИЛС" v-maska="'###-###-###-##'"/>
        <AppInput type="tel" name="phone" rules="required" label="Телефон" />
        <AppInput type="email" name="email" rules="required|email" label="Электронная почта" />
        <AppSelect
            name="account"
            rules="required"
            label="Номер лицевого счета"
            :options="accountOptions"
            infomessage="Необходимо привязать хотя бы один лицевой счет"
            @selectFromSelect="GetSelectSelected"
        />
        <AppInput type="text" name="address" rules="required" label="Адрес"/>
        <template v-if="currentType === 1">
          <AppInput type="textarea" name="comment" rules="required" label="Текст заявления" />
        </template>
        <template v-if="currentType === 2">
          <AppDateInterval
              label="Период расчетов"
              name="period"
              rules="required"
              @updateDate="dateUpdateHandler"
          />
        </template>
        <template v-if="currentType === 3">
          <AppInput type="text" name="device_name" rules="required" label="Наименование прибора учета газа" />
          <AppInput type="number" name="device_indication" rules="required" label="Показание"/>
        </template>
        <template v-if="currentType === 4">
          <AppInput type="textarea" name="derection_target" rules="required" label="Цель направления контролера" />
        </template>
        <template v-if="currentType === 5">
          <AppInput type="text" name="org_name" rules="required" label="Наименование организации поверителя" />
          <AppDatePicker name="verification_end" rules="required" label="Дата истечения срока поверки" />
          <AppSelect
              name="verification"
              rules="required"
              label="Поверка проведена"
              :options="verificationTypes"
              infomessage="Необходимо выбрать время проведение поверки"
          />
        </template>
        <template v-if="currentType === 6">
          <AppDateInterval
              label="Период приостановки начислений за сетевой газ"
              name="stop"
              rules="required"
              @updateDate="dateUpdateHandler"
          />
          <AppInput type="number" name="device_current_indication" rules="required" label="Текущие показания (м3)"/>
        </template>
        <template v-if="currentType === 7">
          <AppSelect
              name="sealing"
              rules="required"
              label="Причина опломбировки"
              :options="reasonForSealingTypes"
              infomessage="Необходимо выбрать причину опломбировки"
              @selectFromSelect="GetSealingTypes"
          />
          <AppInput v-if="sealingType === 5" type="text" name="reason_sealing" rules="required" label="Причина повреждения"/>
          <AppSelect
              name="counter_place"
              rules="required"
              label="Место установки счетчика"
              :options="counterPlaceTypes"
              infomessage="Необходимо выбрать место установки счетчика"
          />
        </template>
        <template v-if="currentType === 8">
          <AppDatePicker name="defect_date" rules="required" label="Дата выявления неисправности ПУГ (счетчика газа)" />
          <AppSelect
              name="defect_type"
              rules="required"
              label="Характер неисправности ПУГ"
              :options="defectTypes"
              infomessage="Необходимо выбрать характер неисправности ПУГ"
              @selectFromSelect="GetDefectType"
          />
          <AppInput v-if="defectType === 4" type="textarea" name="defect_type_comment" rules="required" label="Описание характера неисправности ПУГ"/>
        </template>
        <template v-if="currentType === 9">
          <AppInput type="number" name="debt_amount" rules="required" label="Размер задолженности на текущую дату (рублей)"/>
          <AppDatePicker class="tw-col-span-3" name="amortization_date" rules="required" label="Дата погашения долга" />
          <AppDatePicker class="tw-col-span-3" name="payment_date" rules="required" label="Дата оплаты стоимости услуг по ограничению и возобновлению поставки газа" />
          <AppDateInterval
              label="Период подключения к газопроводу"
              name="connection"
              rules="required"
              @updateDate="dateUpdateHandler"
          />
        </template>
        <template v-if="currentType === 10">
          <AppInput type="number" name="debt_amount" rules="required" label="Размер задолженности на текущую дату (рублей)"/>
          <AppSelect
              name="counterPlace"
              rules="required"
              label="Предмет заявления"
              :options="applicationSubjectTypes"
              infomessage="Необходимо выбрать характер неисправности ПУГ"
          />
          <AppSelect
              name="debt_percentage"
              rules="required"
              label="К погашению на 1 этапе (до подписания Соглашения о рассрочке), % долга:"
              :options="debtPercentageTypes"
              infomessage="Необходимо заполнить это поле"
          />
          <AppInput type="number" name="debt_months" rules="required" label="Количество месяцев рассрочки для оставшейся части долга"/>
        </template>
        <AppFile :filename="files" name="files" label="Вложения" accept=".jpg,.jpeg,.png,.doc,.docx,.pdf" multiple />
        <AppCheck name="agree" label="Разъяснения получены, на необходимые перерасчеты согласен" rules="required" value="yes"/>
        <AppCheck name="emailme" label="Прошу направлять счет-извещения по указанному в данном заявлении адресу электронной почты" value="yes"/>
      </AppFieldset>
      <br>
      <hr>
      <ComplexFormToolbar @submit="onSubmit" @showModal="submitModal = true" @handleValidForm="handleValidForm"/>
    </form>
    <AppModal v-model="submitModal">
      <ComplexFormModal @submit="onSubmit" @hideModal="submitModal = false" />
    </AppModal>
    <AppLoading :showing="loading" />
  </div>
</template>

<script>
import useComplexForm from '@/compositions/useComplexForm';
import Alert from '@/components/Alert';
import { useStore } from 'vuex';
import AppDatePicker from "@/core/AppDatePicker.vue";
import AppLabel from "@/core/AppLabel.vue";
import AppInput from "@/core/AppInput.vue";
import AppSelect from "@/core/AppSelect.vue";
import store from "@/store";
import AppDateInterval from "@/core/AppDateInterval.vue";

export default {
  data(){
    return {
      accountOptions: [],
      typeOptions: [],
      verificationTypes: [],
      reasonForSealingTypes: [],
      counterPlaceTypes: [],
      defectTypes: [],
      applicationSubjectTypes: [],
      debtPercentageTypes: [],
      currentType: '',
      sealingType: '',
      defectType: '',
    }
  },
  emits: ['selectFromSelect'],
  async created() {
    try {
      [
        this.accountOptions,
        this.typeOptions,
        this.verificationTypes,
        this.reasonForSealingTypes,
        this.counterPlaceTypes,
        this.defectTypes,
        this.applicationSubjectTypes,
        this.debtPercentageTypes
      ] = await Promise.all(
          [
            store.dispatch('complexForm/getAccounts'),
            store.dispatch('complexForm/getRequestTypes'),
            store.dispatch('complexForm/getVerificationTypes'),
            store.dispatch('complexForm/getReasonForSealingTypes'),
            store.dispatch('complexForm/getCounterPlaceTypes'),
            store.dispatch('complexForm/getDefectTypes'),
            store.dispatch('complexForm/getSubjectApplicationTypes'),
            store.dispatch('complexForm/getDebtPercentageTypes')
      ])

    } catch (e){
      console.error(e)
    }
  },
  methods: {
      GetSelectSelected(value) {
        this.handleAddress(value);
      },
      GetTypeSelected(value){
        this.currentType = +value
      },
      GetSealingTypes(value){
        this.sealingType = +value
      },
      GetDefectType(value){
        this.defectType = +value
      },
      dateUpdateHandler(name, value) {
        this.handleDateInterval(name, value)
      }
  },
  setup() {
    const initialValues = getInitVals();
    const { onSubmit, submitModal, loading, handleValidForm, handleAddress, handleDateInterval} = useComplexForm(initialValues, { social: true });
    const files = [];

    return {
        onSubmit,
        submitModal,
        loading,
        handleValidForm,
        handleAddress,
        files,
        handleDateInterval
    };
  },
  components: {
    AppDateInterval,
    AppSelect,
    AppInput,
    AppLabel,
    AppDatePicker,
    Alert,
    ComplexFormLayout: require('@/components/ComplexFormLayout').default,
    ComplexFormToolbar: require('@/components/ComplexFormToolbar').default,
    ComplexFormModal: require('@/components/ComplexFormModal').default,
  },
};

function getInitVals() {



  return {
    comment: '',
    files: null,
    agree: "",
    emailme: ""

  };
}
</script>
