<template>
  <el-row>筛选条件</el-row>
  <el-row>
    <el-form :label-position="'right'" :rules="rules" ref="ruleFormRef" :model="props">
      <!--是否有国家选择-->
      <template v-if="showCountry">
        <!--有多选-->
        <template v-if="multipleSelect">
          <el-form-item label="国家" prop="countries">
            <el-select v-model="countries" filterable placeholder="Select" multiple>
              <!--选项分组-->
              <template v-if="groupSelect">
                <el-option-group label="by continent">
                  <el-option value="all"></el-option>
                </el-option-group>
                <el-option-group label="by country/region">
                  <el-option v-for="item in countryList" :key="item" :value="item" />
                </el-option-group>
              </template>
              <template v-else>
                <el-option v-for="item in countryList" :key="item" :value="item" />
              </template>
            </el-select>
          </el-form-item>
        </template>
        <!--无多选，单选-->
        <template v-else>
          <el-form-item label="国家" prop="country">
            <el-select v-model="country" filterable placeholder="Select" prop="country">
              <el-option v-for="item in countryList" :key="item" :value="item" />
            </el-select>
          </el-form-item>
        </template>
      </template>
      <!--是否有学科选择-->
      <template v-if="showClassification">
        <el-form-item label="主题" prop="classifications">
          <el-select v-model="classifications" filterable placeholder="Select" multiple>
            <template v-if="groupSelect">
              <el-option-group label="all">
                <el-option value="all"></el-option>
              </el-option-group>
              <el-option-group label="single">
                <el-option v-for="item in classificationList" :key="item" :value="item" />
              </el-option-group>
            </template>
            <template v-else>
              <el-option v-for="item in classificationList" :key="item" :value="item" />
            </template>
          </el-select>
        </el-form-item>
      </template>
      <!--是否有年份选择-->
      <template v-if="showYear">
        <el-form-item label="年份范围">
          <el-col :span="6">
            <el-date-picker
              v-model="yearStart"
              type="year"
              format="YYYY"
              value-format="YYYY"
              label="start year"
              placeholder="start year"
              style="width: 100%"
              editable
            />
          </el-col>
          <el-col class="text-center" :span="1" style="text-align: center">-</el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="yearEnd"
              type="year"
              format="YYYY"
              value-format="YYYY"
              label="end year"
              placeholder="end year"
              style="width: 100%"
              editable
            />
          </el-col>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useSelectStore } from '@/stores/filter';
import type { FormInstance, FormRules } from 'element-plus';

interface Props {
  showCountry?: boolean;
  multipleSelect?: boolean;
  groupSelect?: boolean;
  showClassification?: boolean;
  showYear?: boolean;
  country?: string;
  countries?: string[];
  classifications?: string[];
  yearStart: string;
  yearEnd: string;
}

const props = withDefaults(defineProps<Props>(), {
  showCountry: true,
  multipleSelect: false,
  groupSelect: false,
  showClassification: true,
  showYear: true,
  country: 'UnitedStates',
  countries: () => ['UnitedStates'],
  classifications: () => ['Computer science'],
  yearStart: '1950',
  yearEnd: '2022'
});

const emit = defineEmits([
  'updateData',
  'update:country',
  'update:countries',
  'update:classifications',
  'update:yearStart',
  'update:yearEnd'
]);

const store = useSelectStore();

const countryList = store.countryList;

const classificationList = store.classificationList;

const country = computed({
  get() {
    return props.country;
  },
  set(value) {
    emit('update:country', value);
  }
});

const countries = computed({
  get() {
    return props.countries;
  },
  set(value) {
    emit('update:countries', value);
  }
});

const classifications = computed({
  get() {
    return props.classifications;
  },
  set(value) {
    emit('update:classifications', value);
  }
});

const yearStart = computed({
  get() {
    return props.yearStart;
  },
  set(value) {
    emit('update:yearStart', value);
  }
});

const yearEnd = computed({
  get() {
    return props.yearEnd;
  },
  set(value) {
    emit('update:yearEnd', value);
  }
});

//校验规则
const ruleFormRef = ref<FormInstance>();

const validateCountries = (rule: any, value: string[], callback: any) => {
  if (value.length < 1) {
    return callback(new Error('请至少选择一项'));
  } else if (value.length > 1) {
    if (value.includes('all')) {
      return callback(new Error('选择 all 时只能单独选择这一项'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

const validateClassifications = (rule: any, value: string[], callback: any) => {
  if (value.length < 1) {
    return callback(new Error('请至少选择一项'));
  } else if (value.length > 1) {
    if (value.includes('all')) {
      return callback(new Error('选择 all 时只能单独选择这一项'));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  countries: [{ validator: validateCountries, trigger: 'change' }],
  country: [
    {
      required: true,
      message: '请至少选择一项',
      trigger: 'change'
    }
  ],
  classifications: [{ validator: validateClassifications, trigger: 'change' }]
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emit('updateData');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
</script>

<style scoped></style>
