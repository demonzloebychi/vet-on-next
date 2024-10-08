// pages/doctors/[id].js
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
      <Menu></Menu>
      <BackButton></BackButton>
      <h1>{doctor.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: doctor.content.rendered }} />
    </div>
  );
};

export async function getStaticPaths() {
  // Получаем список всех докторов
  const res = await axios.get('https://vethome24.ru/wp-json/wp/v2/doctors');
  const doctors = res.data;

  // Создаем массив путей для статической генерации
  const paths = doctors.map((doctor) => ({
    params: { id: doctor.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  // Получаем данные доктора по ID
  const res = await axios.get(`https://vethome24.ru/wp-json/wp/v2/doctors/${params.id}`);
  const doctor = res.data;

  return {
    props: { doctor },
  };
}

export default Doctor;