<script setup lang="ts">
const model = await useFBX("/cap.fbx");
const { onLoop } = useRenderLoop();

onLoop(({ delta, elapsed }) => {
  if (model) {
    model.rotation.y += delta;
    model.rotation.z = elapsed * 0.2;
  }
});
const isOpen = useState("search");

function onFocus(e: any) {
  isOpen.value = true;
  e.target.blur();
}
</script>

<template>
  <ClientOnly>
    <UContainer
      class="min-h-[33rem] h-full mt-32 grid lg:grid-cols-2 bg-gradient-to-tl from-zinc-800 to-black rounded-3xl items-center mx-3 lg:mx-auto"
    >
      <section class="text-white p-5 lg:p-10 dark">
        <h1 class="text-4xl mb-3">
          <span class="text-orange-500">Her Eve Bir Uzman,</span>
          <br />
          Her Eve Bir Psikolog
        </h1>
        <p class="mb-10">Geleceğinize yatırım yapın, başarıya ulaşın!</p>
        <div class="mb-2 flex gap-2">
          <UBadge label="#kurs" variant="subtle" />
          <UBadge label="#etkinlik" variant="subtle" color="blue" />
          <UBadge label="#blog" variant="subtle" color="red" />
        </div>
        <UButtonGroup
          :ui="{
            rounded: 'rounded-md',
            wrapper: {
              horizontal: 'w-full',
            },
          }"
          orientation="horizontal"
          size="xl"
        >
          <UInput
            placeholder="Aramak için tıkla"
            class="w-full"
            @focus="onFocus"
            variant="outline"
          />
          <UButton label="Ara" @click="isOpen = true" />
        </UButtonGroup>
      </section>
      <section class="h-full hidden lg:block">
        <TresCanvas alpha shadows>
          <TresPerspectiveCamera :position="[1, 1, 1]" />
          <OrbitControls :enableZoom="false" />
          <Suspense>
            <primitive :object="model" :scale="0.025" />
          </Suspense>
          <TresDirectionalLight :intensity="2" :position="[1, 1, 1]" />
          <TresAmbientLight :intensity="1" />
        </TresCanvas>
      </section>
    </UContainer>
  </ClientOnly>
</template>
