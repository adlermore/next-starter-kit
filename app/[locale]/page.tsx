
import Services from "@/components/home/Services";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="overflow-x-hidden">
      <div className="custom_container">
        <Services />

        <h1>{t('title')}</h1>
        <p>{t('description')}</p>
      </div>
    </div>
  );
}
