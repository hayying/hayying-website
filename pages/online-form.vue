<script setup lang="ts">
import removeMarkdown from "markdown-to-text";

const { data }: { data: any } = await useApiFetch(
  "/online-form-page?populate=questions.radioButtonOptions&populate=questions.checkboxOptions"
);
const textAreaQuestions = data?.value?.data?.attributes?.questions?.filter(
  (question: any) => question.__component === "form.question-and-answer-text"
);
const radioQuestions = data?.value?.data?.attributes?.questions?.filter(
  (question: any) => question.__component === "form.question-and-radio-button"
);
const checkboxQuestions = data?.value?.data?.attributes?.questions?.filter(
  (question: any) => question.__component === "form.question-with-checkbox"
);

const { jwt, isAuthenticated } = useUserStore();
const loading = ref(false);
const { add } = useToast();

const textareaAnswers = ref<any>([]);
const checkboxAnswers = ref<any>([]);
const radioAnswers = ref<any>([]);

textAreaQuestions?.forEach((question: any) => {
  textareaAnswers?.value?.push({
    question: removeMarkdown(question.question),
    answer: "",
  });
});

radioQuestions?.forEach((question: any) => {
  radioAnswers?.value?.push({
    question: removeMarkdown(question.question),
    answer: "",
  });
});

checkboxQuestions?.forEach((question: any) => {
  checkboxAnswers?.value?.push({
    question: removeMarkdown(question.question),
    answers: [],
  });
});

function checkboxOnChange(event: any, i: number, option: string) {
  if (event) {
    checkboxAnswers.value[i].answers.push(option);
  } else {
    checkboxAnswers.value[i].answers = checkboxAnswers.value[i].answers.filter(
      (answer: string) => answer !== option
    );
  }
}

async function sendForm() {
  if (!isAuthenticated) {
    add({
      title: "Hata",
      description: "Form gönderebilmek için giriş yapmalısınız.",
      color: "red",
    });
    return;
  }
  loading.value = true;
  for (let i = 0; i < textAreaQuestions.length; i++) {
    if (textAreaQuestions[i].isRequired && !textareaAnswers.value[i].answer) {
      add({
        title: "Hata",
        description: "Lütfen tüm zorunlu alanları doldurunuz.",
        color: "red",
      });
      loading.value = false;
      return;
    }
  }
  for (let i = 0; i < radioQuestions.length; i++) {
    if (radioQuestions[i].isRequired && !radioAnswers.value[i].answer) {
      add({
        title: "Hata",
        description: "Lütfen tüm zorunlu alanları doldurunuz.",
        color: "red",
      });
      loading.value = false;
      return;
    }
  }
  for (let i = 0; i < checkboxQuestions.length; i++) {
    if (
      checkboxQuestions[i].isRequired &&
      !checkboxAnswers.value[i].answers.length
    ) {
      add({
        title: "Hata",
        description: "Lütfen tüm zorunlu alanları doldurunuz.",
        color: "red",
      });
      loading.value = false;
      return;
    }
  }

  const answers = [
    ...textareaAnswers.value,
    ...radioAnswers.value,
    ...checkboxAnswers.value,
  ];

  const { status } = await useApiFetch("/online-form", {
    method: "POST",
    body: {
      data: {
        onlineForm: answers,
      },
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  if (status.value === "success") {
    add({
      title: "Başarılı",
      description: "Form başarıyla gönderildi.",
    });
    await navigateTo("/");
  } else {
    add({
      title: "Hata",
      description: "Form gönderilirken bir hata oluştu.",
      color: "red",
    });
  }
  loading.value = false;
}
</script>

<template>
  <WebPageHeader title="ONLİNE FORM" img="/banner.jpg" />
  <ClientOnly>
    <UContainer class="my-32 space-y-7" :ui="{ constrained: 'max-w-2xl' }">
      <div v-for="(question, i) in textAreaQuestions" :key="question.id">
        <div class="flex items-center gap-2">
          <span v-if="question.isRequired" class="text-red-500">*</span>
          <MDC :value="question.question" />
        </div>

        <UTextarea v-model="textareaAnswers[i].answer" />
      </div>
      <div v-for="(question, i) in radioQuestions" :key="question.id">
        <div class="flex items-center gap-2">
          <span v-if="question.isRequired" class="text-red-500">*</span>
          <MDC :value="question.question" />
        </div>
        <URadioGroup
          v-model="radioAnswers[i].answer"
          :options="question.radioButtonOptions.map((option: any) => ({
          label: option.option,
          value: option.option,
        }))"
        />
      </div>
      <div v-for="(question, i) in checkboxQuestions" :key="question.id">
        <div class="flex items-center gap-2">
          <span v-if="question.isRequired" class="text-red-500">*</span>
          <MDC :value="question.question" />
        </div>
        <UCheckbox
          v-for="option in question.checkboxOptions"
          :label="option.option"
          @change="checkboxOnChange($event, i, option.option)"
        />
      </div>
      <UButton
        :loading="loading"
        @click="sendForm"
        label="Gönder"
        size="xl"
        block
      />
    </UContainer>
  </ClientOnly>
</template>
