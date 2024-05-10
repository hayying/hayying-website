<template>
  <WebHomeHeroHeader />
  <WebFeatures
    :features="[
      {
        title: '+200 Kurs',
        description: 'Çeşitli yeni konuları keşfedin',
        icon: 'ph:graduation-cap-light',
      },
      {
        title: 'Uzman öğretmenler',
        description: 'Sizin için doğru eğitmeni bulun',
        icon: 'solar:cup-outline',
      },
      {
        title: 'Hedefe odaklan',
        description: 'Kişisel uzmanlığınızı artırın',
        icon: 'icon-park-outline:target-one',
      },
    ]"
  />
  <WebHomeCourses />
  <WebHomeEvents />
  <WebHomeContact />
</template>
