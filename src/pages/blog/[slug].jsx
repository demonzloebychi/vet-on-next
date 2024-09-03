// pages/doctors/[slug].js
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import BackButton from '../components/BackButton';

const Doctor = ({ doctor }) => {
  const router = useRouter();

  // Проверяем, загрузились ли данные доктора
  if (router.isFallback || !doctor) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className='container'>
      <Menu />
      <BackButton />
      <h1>{doctor.title.rendered}</h1>
      <div className='blog__post-text' dangerouslySetInnerHTML={{ __html: doctor.content.rendered }} />
    </div>
  );
};

export async function getStaticPaths() {
  // Получаем список всех докторов
  const res = await axios.get('https://vethome24.ru/wp-json/wp/v2/blog');
  const doctors = res.data;

  // Создаем массив путей для статической генерации на основе slug
  const paths = doctors.map((doctor) => ({
    params: { slug: doctor.slug }, // Используем slug напрямую
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Получаем данные доктора по slug
  const res = await axios.get('https://vethome24.ru/wp-json/wp/v2/blog');
  const doctors = res.data;

  // Находим доктора по slug
  const doctor = doctors.find((doc) => doc.slug === params.slug);

  return {
    props: { doctor },
  };
}

export default Doctor;