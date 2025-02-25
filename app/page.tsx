'use client';

import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUpIcon, PlayCircleIcon, UserIcon, StarIcon } from "lucide-react"

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          {t('common.home.title')}
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mt-4">
          {t('common.home.subtitle')}
        </p>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <PlayCircleIcon className="h-8 w-8 mb-2" />
            <CardTitle>{t('common.home.features.mediaCatalog.title')}</CardTitle>
            <CardDescription>{t('common.home.features.mediaCatalog.description')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <TrendingUpIcon className="h-8 w-8 mb-2" />
            <CardTitle>{t('common.home.features.recommendations.title')}</CardTitle>
            <CardDescription>{t('common.home.features.recommendations.description')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <UserIcon className="h-8 w-8 mb-2" />
            <CardTitle>{t('common.home.features.userProfiles.title')}</CardTitle>
            <CardDescription>{t('common.home.features.userProfiles.description')}</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <StarIcon className="h-8 w-8 mb-2" />
            <CardTitle>{t('common.home.features.ratingsReviews.title')}</CardTitle>
            <CardDescription>{t('common.home.features.ratingsReviews.description')}</CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="text-center py-8">
        <Button size="lg" className="gap-2">
          <PlayCircleIcon className="h-5 w-5" />
          {t('common.home.startExploring')}
        </Button>
      </section>
    </div>
  )
}