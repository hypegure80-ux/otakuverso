export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
  views: number;
}

export interface AnimeManga {
  id: string;
  title: string;
  originalTitle?: string;
  type: 'anime' | 'manga' | 'webtoon' | 'manhua' | 'manhwa' | 'donghua';
  status: 'En emisión' | 'Finalizado' | 'En pausa' | 'Anunciado';
  genres: string[];
  rating: number;
  synopsis: string;
  cover: string;
  year: number;
  episodes?: number;
  chapters?: number;
  studio?: string;
  author?: string;
}

export interface FanartItem {
  id: string;
  title: string;
  artist: string;
  series: string;
  image: string;
  likes: number;
}

export interface OpeningEnding {
  id: string;
  title: string;
  anime: string;
  type: 'OP' | 'ED';
  number: number;
  artist: string;
  season: string;
  year: number;
  thumbnail: string;
  url: string;
}

export interface Mangaka {
  id: string;
  name: string;
  image: string;
  birthDate: string;
  nationality: string;
  bio: string;
  works: string[];
  awards: string[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export const newsData: NewsItem[] = [
  {
    id: 'n1',
    title: 'Kaiju No. 8 Temporada 2: Todo lo que sabemos del regreso de Kafka',
    excerpt: 'La segunda temporada del anime de acción más esperado del verano 2025 ya tiene fecha de estreno y nuevo tráiler.',
    content: 'Production I.G vuelve a la carga con la segunda temporada de Kaiju No. 8, uno de los shonen más populares de los últimos años. La nueva temporada se estrenará en julio de 2025 y adaptará el arco de la "Defensa de la Tercera División". El tráiler revela nuevos diseños de personajes y secuencias de acción que prometen superar a la primera temporada. La serie sigue a Kafka Hibino, un hombre de 32 años que sueña con unirse a la Fuerza de Defensa contra Kaiju.',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80',
    date: '2025-06-15',
    author: 'Hikaru Tanaka',
    tags: ['Kaiju No. 8', 'Anime 2025', 'Shonen', 'Production I.G'],
    views: 45200
  },
  {
    id: 'n2',
    title: 'Dandadan Temporada 2 confirma estudio y ventana de estreno',
    excerpt: 'Science SARU vuelve para la segunda temporada del fenómeno sobrenatural que conquistó a millones de espectadores.',
    content: 'Tras el éxito arrollador de la primera temporada, Science SARU ha confirmado oficialmente que Dandadan regresará en verano de 2025. La adaptación del manga de Yukinobu Tatsu continuará con el arco de la "Lucha contra los alienígenas". Los fans pueden esperar la misma calidad de animación que hizo famosa a la primera temporada, con escenas de acción fluidas y un estilo visual único que mezcla lo sobrenatural con lo cómico.',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=800&q=80',
    date: '2025-06-14',
    author: 'Yuki Sato',
    tags: ['Dandadan', 'Science SARU', 'Anime 2025', 'Sobrenatural'],
    views: 38900
  },
  {
    id: 'n3',
    title: 'Märchen Crown: El nuevo manga de Aka Akasaka llega a occidente',
    excerpt: 'El creador de Kaguya-sama lanza una nueva serie en Weekly Young Jump que promete revolucionar el género de fantasía.',
    content: 'Aka Akasaka, conocido mundialmente por Kaguya-sama: Love is War, ha lanzado Märchen Crown en colaboración con el artista Azychika. La serie debutó en Weekly Young Jump el 19 de marzo de 2025 y ya ha generado enorme expectación. La historia sigue a un joven que descubre que es el heredero de un reino de cuentos de hadas, pero con un giro oscuro: cada cuento tiene un precio que pagar. Viz Media ha anunciado la licencia para América del Norte.',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
    date: '2025-06-13',
    author: 'Rin Kobayashi',
    tags: ['Märchen Crown', 'Aka Akasaka', 'Manga 2025', 'Fantasía'],
    views: 32100
  },
  {
    id: 'n4',
    title: 'Solo Leveling rompe récords de audiencia en su segunda temporada',
    excerpt: 'El anime de A-1 Pictures se convierte en el título más visto de la historia de Crunchyroll en 2025.',
    content: 'Solo Leveling: Arise from the Shadow ha superado todas las expectativas, alcanzando cifras récord de audiencia en Crunchyroll y otras plataformas de streaming. La segunda temporada, que adapta el arco de la "Guerra de las Monarcas", ha sido elogiada por su animación de alta calidad y su fidelidad al webtoon original. Sung Jin-Woo continúa su ascenso como el cazador más poderoso del mundo, y los fans no pueden esperar a ver cómo se desarrolla el enfrentamiento final.',
    category: 'Anime',
    image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80',
    date: '2025-06-12',
    author: 'Min-jae Park',
    tags: ['Solo Leveling', 'A-1 Pictures', 'Manhwa', 'Crunchyroll'],
    views: 67800
  },
  {
    id: 'n5',
    title: 'AnimeJapan 2025: Los anuncios más importantes de la convención',
    excerpt: 'Desde nuevas adaptaciones hasta sorpresas inesperadas, repasamos todo lo que dejó la mayor convención de anime del año.',
    content: 'AnimeJapan 2025 se celebró con récord de asistentes y una avalancha de anuncios. Entre los más destacados se encuentran: una nueva película de Your Name de Makoto Shinkai, la tercera temporada de Spy x Family, un anime original de los creadores de Attack on Titan, y la adaptación al anime del manga Galaxias. Además, se anunció un nuevo proyecto de Studio Ghibli en colaboración con un estudio coreano, marcando la primera vez que el legendario estudio trabaja con animadores de Corea del Sur.',
    category: 'Eventos',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80',
    date: '2025-06-10',
    author: 'Kenji Yamamoto',
    tags: ['AnimeJapan', 'Convenciones', 'Studio Ghibli', 'Spy x Family'],
    views: 54300
  },
  {
    id: 'n6',
    title: 'Teenage Mercenary: Del webtoon al anime en 2026',
    excerpt: 'WEBTOON anuncia la adaptación animada de uno de sus títulos de acción más populares.',
    content: 'WEBTOON ha anunciado oficialmente que Teenage Mercenary, uno de sus webtoons de acción más leídos, recibirá una adaptación al anime en 2026. La serie sigue a Yu Ijin, un adolescente que regresa a Corea del Sur tras años como mercenario, y debe adaptarse a la vida escolar mientras protege a su familia. El estudio a cargo aún no ha sido revelado, pero se espera un anuncio en los próximos meses.',
    category: 'Manhwa',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    date: '2025-06-09',
    author: 'Soo-min Lee',
    tags: ['Teenage Mercenary', 'WEBTOON', 'Manhwa', 'Anime 2026'],
    views: 29800
  },
  {
    id: 'n7',
    title: 'Comiket 106: Fechas confirmadas y novedades para el verano',
    excerpt: 'La mayor convención de doujinshi del mundo vuelve con medidas de seguridad renovadas y espacio expandido.',
    content: 'Comiket 106 se celebrará los días 13, 14 y 15 de agosto de 2025 en el Tokyo Big Sight. Los organizadores han anunciado una expansión del espacio de exposición en un 20% para acomodar la creciente demanda. Se esperan más de 600,000 asistentes durante los tres días. Entre las novedades destacan una sección dedicada exclusivamente a webtoons y manhua, reflejando la creciente influencia del contenido asiático no japonés en la comunidad otaku.',
    category: 'Eventos',
    image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=800&q=80',
    date: '2025-06-08',
    author: 'Akira Fujiwara',
    tags: ['Comiket', 'Convenciones', 'Doujinshi', 'Tokyo'],
    views: 41500
  },
  {
    id: 'n8',
    title: 'Jujutsu Kaisen: El manga más vendido de 2025 según Oricon',
    excerpt: 'A pesar de haber finalizado, la obra de Gege Akutami sigue dominando las listas de ventas.',
    content: 'Las listas de ventas de Oricon para la primera mitad de 2025 confirman lo que muchos esperaban: Jujutsu Kaisen sigue siendo el manga más vendido del año, a pesar de que su serialización finalizó en 2024. Los volúmenes finales y las ediciones especiales han mantenido un ritmo de ventas extraordinario. Le siguen en la lista One Piece, que celebra su año 28 de serialización, y Chainsaw Man, que también ha mantenido un rendimiento sólido.',
    category: 'Manga',
    image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=800&q=80',
    date: '2025-06-07',
    author: 'Takeshi Mori',
    tags: ['Jujutsu Kaisen', 'Oricon', 'Ventas', 'Gege Akutami'],
    views: 51200
  },
  {
    id: 'n9',
    title: 'Donghua 2025: La explosión de la animación china',
    excerpt: 'Series como The King\'s Avatar y Soul Land lideran la conquista global del contenido animado chino.',
    content: 'La industria del donghua (animación china) ha experimentado un crecimiento sin precedentes en 2025. Plataformas como Bilibili, Tencent Video y iQiyi han invertido miles de millones en producciones de alta calidad. The King\'s Avatar continúa siendo el referente del género, mientras que nuevas series como Swallowed Star y Perfect World han ganado audiencias masivas fuera de China. La calidad de animación 3D ha alcanzado niveles comparables a los mejores estudios japoneses.',
    category: 'Donghua',
    image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&q=80',
    date: '2025-06-06',
    author: 'Wei Zhang',
    tags: ['Donghua', 'China', 'The King\'s Avatar', 'Animación 3D'],
    views: 27600
  },
  {
    id: 'n10',
    title: 'K-pop y anime: La colaboración cada vez más fuerte entre industrias',
    excerpt: 'Desde BTS hasta NewJeans, los idols coreanos cada vez participan más en openings y soundtracks de anime.',
    content: 'La sinergia entre la industria del K-pop y el anime nunca ha sido tan fuerte. En 2025 hemos visto colaboraciones como NewJeans cantando el opening de una serie original de Netflix, Stray Kids participando en el soundtrack de Solo Leveling, y BTS colaborando con un estudio de animación japonés para un proyecto original. Esta tendencia refleja la creciente globalización de ambas industrias y la superposición de sus audiencias.',
    category: 'Cultura Pop',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    date: '2025-06-05',
    author: 'Ji-yeon Kim',
    tags: ['K-pop', 'Colaboraciones', 'BTS', 'NewJeans', 'OST'],
    views: 63400
  }
];

export const animeData: AnimeManga[] = [
  { id: 'a1', title: 'Kaiju No. 8', originalTitle: '怪獣8号', type: 'anime', status: 'En emisión', genres: ['Acción', 'Ciencia Ficción', 'Shonen'], rating: 8.4, synopsis: 'Kafka Hibino, un hombre de 32 años, sueña con unirse a la Fuerza de Defensa contra Kaiju. Después de un encuentro con un kaiju parásito, obtiene la habilidad de transformarse en un kaiju.', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', year: 2025, episodes: 12, studio: 'Production I.G' },
  { id: 'a2', title: 'Dandadan', originalTitle: 'ダンダダン', type: 'anime', status: 'En emisión', genres: ['Acción', 'Sobrenatural', 'Comedia'], rating: 8.7, synopsis: 'Momo Ayase y Ken Takakura hacen una apuesta sobre fantasmas y alienígenas, desencadenando una serie de eventos sobrenaturales que cambiarán sus vidas.', cover: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80', year: 2025, episodes: 12, studio: 'Science SARU' },
  { id: 'a3', title: 'Solo Leveling', originalTitle: '나 혼자만 레벨업', type: 'anime', status: 'En emisión', genres: ['Acción', 'Fantasía', 'Aventura'], rating: 9.1, synopsis: 'Sung Jin-Woo, el cazador más débil del mundo, obtiene un sistema misterioso que le permite subir de nivel sin límites.', cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', year: 2025, episodes: 13, studio: 'A-1 Pictures' },
  { id: 'a4', title: 'The Rising of the Shield Hero', originalTitle: '盾の勇者の成り上がり', type: 'anime', status: 'En emisión', genres: ['Isekai', 'Fantasía', 'Acción'], rating: 7.8, synopsis: 'Naofumi Iwatani es convocado a otro mundo como el Héroe del Escudo. Traicionado y abandonado, debe encontrar la fuerza para proteger el mundo.', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', year: 2025, episodes: 13, studio: 'Kinema Citrus' },
  { id: 'a5', title: 'Toilet-Bound Hanako-kun', originalTitle: '地縛少年花子くん', type: 'anime', status: 'En emisión', genres: ['Sobrenatural', 'Comedia', 'Drama'], rating: 8.2, synopsis: 'Nene Yashiro invoca al espíritu Hanako-san del baño y queda atada a él mientras resuelven misterios sobrenaturales en la escuela.', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', year: 2025, episodes: 12, studio: 'Lerche' },
  { id: 'a6', title: 'My Hero Academia: Vigilantes', originalTitle: 'ヴィジランテ', type: 'anime', status: 'En emisión', genres: ['Acción', 'Superhéroes', 'Shonen'], rating: 8.0, synopsis: 'Spin-off de My Hero Academia que sigue a Koichi Haimawari, un vigilante sin licencia que protege las calles.', cover: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80', year: 2025, episodes: 13, studio: 'Bones' },
  { id: 'a7', title: 'Rent-A-Girlfriend', originalTitle: '彼女、お借りします', type: 'anime', status: 'En emisión', genres: ['Romance', 'Comedia', 'Drama'], rating: 7.2, synopsis: 'Kazuya Kinoshita alquila una novia después de ser abandonado, pero las cosas se complican cuando descubre que vive cerca.', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80', year: 2025, episodes: 12, studio: 'TMS Entertainment' },
  { id: 'a8', title: 'Attack on Titan: The Final Season', originalTitle: '進撃の巨人', type: 'anime', status: 'Finalizado', genres: ['Acción', 'Drama', 'Fantasía Oscura'], rating: 9.3, synopsis: 'Eren Yeager y sus amigos descubren la verdad detrás de los titanes y los muros en un enfrentamiento épico por la libertad.', cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80', year: 2024, episodes: 28, studio: 'MAPPA' },
  { id: 'a9', title: 'Jujutsu Kaisen', originalTitle: '呪術廻戦', type: 'anime', status: 'Finalizado', genres: ['Acción', 'Sobrenatural', 'Shonen'], rating: 9.0, synopsis: 'Yuji Itadori ingiere un dedo maldito y se convierte en el recipiente de Sukuna, el rey de las maldiciones.', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', year: 2024, episodes: 47, studio: 'MAPPA' },
  { id: 'a10', title: 'Demon Slayer', originalTitle: '鬼滅の刃', type: 'anime', status: 'Finalizado', genres: ['Acción', 'Fantasía Oscura', 'Histórico'], rating: 8.9, synopsis: 'Tanjiro Kamado busca venganza y una cura para su hermana Nezuko, convertida en demonio.', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80', year: 2024, episodes: 55, studio: 'ufotable' },
  { id: 'a11', title: 'Spy x Family', originalTitle: 'SPY×FAMILY', type: 'anime', status: 'Finalizado', genres: ['Acción', 'Comedia', 'Slice of Life'], rating: 8.6, synopsis: 'Un espía, una asesina y una telepata forman una familia falsa mientras cada uno oculta su verdadera identidad.', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', year: 2024, episodes: 25, studio: 'Wit Studio' },
  { id: 'a12', title: 'Chainsaw Man', originalTitle: 'チェンソーマン', type: 'anime', status: 'En pausa', genres: ['Acción', 'Terror', 'Sobrenatural'], rating: 8.8, synopsis: 'Denji se fusiona con su perro demonio Pochita y se convierte en Chainsaw Man, un cazador de demonios.', cover: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80', year: 2023, episodes: 12, studio: 'MAPPA' },
];

export const mangaData: AnimeManga[] = [
  { id: 'm1', title: 'Märchen Crown', originalTitle: 'メルヘンクラウン', type: 'manga', status: 'En emisión', genres: ['Fantasía', 'Drama', 'Aventura'], rating: 8.3, synopsis: 'Un joven descubre que es el heredero de un reino de cuentos de hadas, pero cada cuento tiene un precio oscuro.', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', year: 2025, chapters: 15, author: 'Aka Akasaka' },
  { id: 'm2', title: 'Jujutsu Kaisen', originalTitle: '呪術廻戦', type: 'manga', status: 'Finalizado', genres: ['Acción', 'Sobrenatural', 'Shonen'], rating: 9.0, synopsis: 'Yuji Itadori ingiere un dedo maldito y se convierte en el recipiente de Sukuna, el rey de las maldiciones.', cover: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80', year: 2024, chapters: 271, author: 'Gege Akutami' },
  { id: 'm3', title: 'One Piece', originalTitle: 'ワンピース', type: 'manga', status: 'En emisión', genres: ['Aventura', 'Acción', 'Comedia'], rating: 9.2, synopsis: 'Monkey D. Luffy y su tripulación de piratas buscan el tesoro legendario conocido como One Piece.', cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', year: 2025, chapters: 1130, author: 'Eiichiro Oda' },
  { id: 'm4', title: 'Chainsaw Man', originalTitle: 'チェンソーマン', type: 'manga', status: 'En emisión', genres: ['Acción', 'Terror', 'Sobrenatural'], rating: 8.9, synopsis: 'Denji se fusiona con su perro demonio Pochita y se convierte en Chainsaw Man, un cazador de demonios.', cover: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80', year: 2025, chapters: 180, author: 'Tatsuki Fujimoto' },
  { id: 'm5', title: 'Cosmos', originalTitle: 'コスモス', type: 'manga', status: 'En emisión', genres: ['Ciencia Ficción', 'Drama', 'Misterio'], rating: 8.1, synopsis: 'Una historia épica sobre la exploración espacial y los secretos del universo.', cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80', year: 2025, chapters: 22, author: 'Yukinori Kawaguchi' },
  { id: 'm6', title: 'Galaxias', originalTitle: 'ガラクシアス', type: 'manga', status: 'En emisión', genres: ['Fantasía', 'Aventura', 'Shonen'], rating: 8.0, synopsis: 'Un joven guerrero viaja por las galaxias en busca de las reliquias de los dioses antiguos.', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', year: 2025, chapters: 30, author: 'Takuya Mitsuda' },
  { id: 'm7', title: 'WITCHRIV', originalTitle: 'ウィッチリヴ', type: 'manga', status: 'En emisión', genres: ['Fantasía', 'Acción', 'Magia'], rating: 8.5, synopsis: 'Una bruja rebelde lucha contra un imperio que quiere erradicar la magia del mundo.', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', year: 2025, chapters: 18, author: 'Sora Hasegawa' },
  { id: 'm8', title: 'Kaguya-sama: Love is War', originalTitle: 'かぐや様は告らせたい', type: 'manga', status: 'Finalizado', genres: ['Romance', 'Comedia', 'Psicológico'], rating: 9.0, synopsis: 'Dos genios del consejo estudiantil luchan por hacer que el otro confiese primero su amor.', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80', year: 2023, chapters: 281, author: 'Aka Akasaka' },
];

export const webtoonData: AnimeManga[] = [
  { id: 'w1', title: 'Solo Leveling', originalTitle: '나 혼자만 레벨업', type: 'webtoon', status: 'Finalizado', genres: ['Acción', 'Fantasía', 'Aventura'], rating: 9.2, synopsis: 'Sung Jin-Woo, el cazador más débil, obtiene un sistema que le permite subir de nivel infinitamente.', cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', year: 2023, chapters: 179, author: 'Chugong / DUBU' },
  { id: 'w2', title: 'Tower of God', originalTitle: '신의 탑', type: 'webtoon', status: 'En emisión', genres: ['Acción', 'Fantasía', 'Drama'], rating: 8.8, synopsis: 'Bam entra en la Torre para encontrar a Rachel, enfrentándose a pruebas mortales en cada piso.', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', year: 2025, chapters: 650, author: 'SIU' },
  { id: 'w3', title: 'True Beauty', originalTitle: '여신강림', type: 'webtoon', status: 'En emisión', genres: ['Romance', 'Drama', 'Comedia'], rating: 8.0, synopsis: 'Jugyeong usa maquillaje para transformarse en una diosa, pero lucha por aceptar su verdadero yo.', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80', year: 2025, chapters: 240, author: 'Yaongyi' },
  { id: 'w4', title: 'Lookism', originalTitle: '외모지상주의', type: 'webtoon', status: 'En emisión', genres: ['Drama', 'Sobrenatural', 'Slice of Life'], rating: 8.3, synopsis: 'Daniel Park puede cambiar entre dos cuerpos: uno guapo y uno feo, descubriendo cómo el mundo trata a cada uno.', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80', year: 2025, chapters: 480, author: 'Taejoon Park' },
  { id: 'w5', title: 'Omniscient Reader', originalTitle: '전지적 독자 시점', type: 'webtoon', status: 'En emisión', genres: ['Acción', 'Fantasía', 'Thriller'], rating: 9.0, synopsis: 'Kim Dokja es el único lector de una novela que se convierte en realidad, y conoce todos los eventos futuros.', cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80', year: 2025, chapters: 210, author: 'Sing Shong / Sleepy-C' },
  { id: 'w6', title: 'Teenage Mercenary', originalTitle: '입학용병', type: 'webtoon', status: 'En emisión', genres: ['Acción', 'Drama', 'Escolar'], rating: 8.5, synopsis: 'Yu Ijin regresa a Corea tras años como mercenario y debe proteger a su familia mientras asiste a la escuela.', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', year: 2025, chapters: 180, author: 'YC / Rakyeon' },
  { id: 'w7', title: 'Dark Moon: The Blood Altar', originalTitle: '다크 문', type: 'webtoon', status: 'En emisión', genres: ['Romance', 'Fantasía', 'Vampiros'], rating: 7.8, synopsis: 'Sooha se muda a una nueva escuela y descubre que sus compañeros son vampiros con un oscuro secreto.', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', year: 2025, chapters: 80, author: 'HYBE' },
];

export const manhuaData: AnimeManga[] = [
  { id: 'mh1', title: 'The King\'s Avatar', originalTitle: '全职高手', type: 'manhua', status: 'En emisión', genres: ['Acción', 'Juegos', 'Deportes'], rating: 8.7, synopsis: 'Ye Xiu, el mejor jugador de Glory, es forzado a retirarse y comienza de nuevo en un Internet café.', cover: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80', year: 2025, chapters: 450, author: 'Butterfly Blue' },
  { id: 'mh2', title: 'Soul Land', originalTitle: '斗罗大陆', type: 'manhua', status: 'En emisión', genres: ['Fantasía', 'Acción', 'Aventura'], rating: 8.4, synopsis: 'Tang San se reencarna en un mundo de espíritus donde debe dominar el arte del Espíritu Azul.', cover: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80', year: 2025, chapters: 380, author: 'Tang Jia San Shao' },
  { id: 'mh3', title: 'Mo Dao Zu Shi', originalTitle: '魔道祖师', type: 'manhua', status: 'Finalizado', genres: ['Fantasía', 'Drama', 'BL'], rating: 9.1, synopsis: 'Wei Wuxian, un poderoso cultivador demoníaco, es traicionado y asesinado, pero reencarna años después.', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', year: 2024, chapters: 260, author: 'Mo Xiang Tong Xiu' },
  { id: 'mh4', title: 'Heaven Official\'s Blessing', originalTitle: '天官赐福', type: 'manhua', status: 'En emisión', genres: ['Fantasía', 'Drama', 'BL'], rating: 8.9, synopsis: 'Xie Lian, un dios desposeído, asciende por tercera vez y se encuentra con un misterioso demonio.', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', year: 2025, chapters: 120, author: 'Mo Xiang Tong Xiu' },
];

export const donghuaData: AnimeManga[] = [
  { id: 'd1', title: 'The King\'s Avatar', originalTitle: '全职高手', type: 'donghua', status: 'En emisión', genres: ['Acción', 'Juegos', 'Deportes'], rating: 8.8, synopsis: 'Ye Xiu, el mejor jugador de Glory, es forzado a retirarse y comienza de nuevo en un Internet café.', cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', year: 2025, episodes: 24, studio: 'Colored Pencil Animation' },
  { id: 'd2', title: 'Soul Land', originalTitle: '斗罗大陆', type: 'donghua', status: 'Finalizado', genres: ['Fantasía', 'Acción', 'Aventura'], rating: 8.5, synopsis: 'Tang San se reencarna en un mundo de espíritus donde debe dominar el arte del Espíritu Azul.', cover: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80', year: 2024, episodes: 264, studio: 'Sparkly Key Animation' },
  { id: 'd3', title: 'Swallowed Star', originalTitle: '吞噬星空', type: 'donghua', status: 'En emisión', genres: ['Ciencia Ficción', 'Acción', 'Aventura'], rating: 8.2, synopsis: 'En un futuro donde monstruos invaden la Tierra, Luo Feng se convierte en un guerrero cósmico.', cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', year: 2025, episodes: 80, studio: 'Sparkly Key Animation' },
  { id: 'd4', title: 'Perfect World', originalTitle: '完美世界', type: 'donghua', status: 'En emisión', genres: ['Fantasía', 'Acción', 'Cultivación'], rating: 8.3, synopsis: 'Shi Hao nace con hueso supremo pero es robado, y debe reconstruir su destino en un mundo de cultivación.', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80', year: 2025, episodes: 180, studio: 'Foch Films' },
  { id: 'd5', title: 'Mo Dao Zu Shi', originalTitle: '魔道祖师', type: 'donghua', status: 'Finalizado', genres: ['Fantasía', 'Drama', 'BL'], rating: 9.0, synopsis: 'Wei Wuxian, un poderoso cultivador demoníaco, es traicionado y asesinado, pero reencarna años después.', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', year: 2023, episodes: 35, studio: 'B.C May Pictures' },
];

export const manhwaData: AnimeManga[] = [
  { id: 'hw1', title: 'Solo Leveling', originalTitle: '나 혼자만 레벨업', type: 'manhwa', status: 'Finalizado', genres: ['Acción', 'Fantasía', 'Aventura'], rating: 9.2, synopsis: 'Sung Jin-Woo, el cazador más débil, obtiene un sistema que le permite subir de nivel infinitamente.', cover: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', year: 2023, chapters: 179, author: 'Chugong / DUBU' },
  { id: 'hw2', title: 'Tower of God', originalTitle: '신의 탑', type: 'manhwa', status: 'En emisión', genres: ['Acción', 'Fantasía', 'Drama'], rating: 8.8, synopsis: 'Bam entra en la Torre para encontrar a Rachel, enfrentándose a pruebas mortales en cada piso.', cover: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', year: 2025, chapters: 650, author: 'SIU' },
  { id: 'hw3', title: 'True Beauty', originalTitle: '여신강림', type: 'manhwa', status: 'En emisión', genres: ['Romance', 'Drama', 'Comedia'], rating: 8.0, synopsis: 'Jugyeong usa maquillaje para transformarse en una diosa, pero lucha por aceptar su verdadero yo.', cover: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80', year: 2025, chapters: 240, author: 'Yaongyi' },
  { id: 'hw4', title: 'I Will Fall with the Emperor', originalTitle: '황제와 함께 몰락하겠습니다', type: 'manhwa', status: 'En emisión', genres: ['Romance', 'Drama', 'Histórico'], rating: 8.1, synopsis: 'Una mujer reencarna en la villana de una novela y decide aceptar su destino junto al emperador.', cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', year: 2025, chapters: 90, author: 'Sangah' },
];

export const fanartData: FanartItem[] = [
  { id: 'f1', title: 'Sung Jin-Woo: El Monarca de las Sombras', artist: 'ShadowArtist', series: 'Solo Leveling', image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=600&q=80', likes: 3420 },
  { id: 'f2', title: 'Kafka Hibino Transformado', artist: 'KaijuDraws', series: 'Kaiju No. 8', image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80', likes: 2890 },
  { id: 'f3', title: 'Momo y Ken', artist: 'DandadanFan', series: 'Dandadan', image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=600&q=80', likes: 2150 },
  { id: 'f4', title: 'Nezuko en el Bosque', artist: 'DemonSlayerArt', series: 'Demon Slayer', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80', likes: 4560 },
  { id: 'f5', title: 'Yuji vs Sukuna', artist: 'JJKMaster', series: 'Jujutsu Kaisen', image: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600&q=80', likes: 3890 },
  { id: 'f6', title: 'Anya Forger', artist: 'SpyFamilyArt', series: 'Spy x Family', image: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=600&q=80', likes: 2780 },
  { id: 'f7', title: 'Tanjiro y Nezuko', artist: 'KimetsuNoYaiba', series: 'Demon Slayer', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80', likes: 4120 },
  { id: 'f8', title: 'Bam en la Torre', artist: 'TowerArtist', series: 'Tower of God', image: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=600&q=80', likes: 1980 },
];

export const openingsData: OpeningEnding[] = [
  { id: 'op1', title: 'Abyss', anime: 'Solo Leveling', type: 'OP', number: 1, artist: 'Tomorrow X Together', season: 'Invierno', year: 2025, thumbnail: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=400&q=80', url: 'https://www.youtube.com/watch?v=example1' },
  { id: 'op2', title: 'Otonoke', anime: 'Dandadan', type: 'OP', number: 1, artist: 'Creepy Nuts', season: 'Otoño', year: 2024, thumbnail: 'https://images.unsplash.com/photo-1541562232579-512a21360020?w=400&q=80', url: 'https://www.youtube.com/watch?v=example2' },
  { id: 'op3', title: 'Kaiju', anime: 'Kaiju No. 8', type: 'OP', number: 1, artist: 'OneRepublic', season: 'Primavera', year: 2024, thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&q=80', url: 'https://www.youtube.com/watch?v=example3' },
  { id: 'op4', title: 'SPECIALZ', anime: 'Jujutsu Kaisen', type: 'OP', number: 2, artist: 'King Gnu', season: 'Otoño', year: 2023, thumbnail: 'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=400&q=80', url: 'https://www.youtube.com/watch?v=example4' },
  { id: 'op5', title: 'KICK BACK', anime: 'Chainsaw Man', type: 'OP', number: 1, artist: 'Kenshi Yonezu', season: 'Otoño', year: 2022, thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80', url: 'https://www.youtube.com/watch?v=example5' },
  { id: 'ed1', title: 'request', anime: 'Dandadan', type: 'ED', number: 1, artist: 'Eve', season: 'Otoño', year: 2024, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', url: 'https://www.youtube.com/watch?v=example6' },
  { id: 'ed2', title: 'LEveL', anime: 'Solo Leveling', type: 'ED', number: 1, artist: 'SawanoHiroyuki', season: 'Invierno', year: 2025, thumbnail: 'https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=400&q=80', url: 'https://www.youtube.com/watch?v=example7' },
  { id: 'ed3', title: 'Akuma no Ko', anime: 'Attack on Titan', type: 'ED', number: 7, artist: 'Ai Higuchi', season: 'Invierno', year: 2023, thumbnail: 'https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=400&q=80', url: 'https://www.youtube.com/watch?v=example8' },
];

export const mangakasData: Mangaka[] = [
  {
    id: 'mk1',
    name: 'Eiichiro Oda',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    birthDate: '1975-01-01',
    nationality: 'Japonés',
    bio: 'Creador de One Piece, el manga más vendido de la historia con más de 500 millones de copias vendidas. Oda comenzó su carrera como asistente de Nobuhiro Watsuki y debutó con One Piece en 1997 en Weekly Shonen Jump.',
    works: ['One Piece', 'Wanted!', 'Monsters', 'Romance Dawn'],
    awards: ['Premio Tezuka', 'Guinness World Record', 'Japan Media Arts Festival']
  },
  {
    id: 'mk2',
    name: 'Gege Akutami',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    birthDate: '1992-02-26',
    nationality: 'Japonés',
    bio: 'Creador de Jujutsu Kaisen, uno de los shonen más exitosos de la década. La serie ha vendido más de 90 millones de copias y ha recibido una adaptación al anime por MAPPA.',
    works: ['Jujutsu Kaisen', 'Jujutsu Kaisen 0', 'Tokyo Metropolitan Curse Technical School', 'No.9'],
    awards: ['Next Manga Award', 'Japan Expo Award', 'Crunchyroll Anime Award']
  },
  {
    id: 'mk3',
    name: 'Aka Akasaka',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    birthDate: '1988-08-29',
    nationality: 'Japonés',
    bio: 'Creador de Kaguya-sama: Love is War y Märchen Crown. Conocido por su estilo de comedia romántica única y diálogos ingeniosos.',
    works: ['Kaguya-sama: Love is War', 'Märchen Crown', 'ib: Instant Bullet'],
    awards: ['Next Manga Award', 'Kodansha Manga Award', 'Crunchyroll Anime Award']
  },
  {
    id: 'mk4',
    name: 'Tatsuki Fujimoto',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&q=80',
    birthDate: '1992-10-10',
    nationality: 'Japonés',
    bio: 'Creador de Chainsaw Man y Fire Punch. Conocido por su estilo narrativo único que mezcla horror, comedia y momentos de profunda humanidad.',
    works: ['Chainsaw Man', 'Fire Punch', 'Look Back', 'Goodbye, Eri'],
    awards: ['Harvey Award', 'Eisner Award', 'Japan Media Arts Festival']
  },
  {
    id: 'mk5',
    name: 'SIU (Lee Jong-hui)',
    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80',
    birthDate: '1986-05-30',
    nationality: 'Coreano',
    bio: 'Creador de Tower of God, uno de los webtoons más populares de la historia. La serie ha sido adaptada al anime y ha inspirado videojuegos.',
    works: ['Tower of God', 'Comic of the Dead', 'Give My Earth Back'],
    awards: ['WEBTOON Award', 'Next Manga Award Nomination']
  },
  {
    id: 'mk6',
    name: 'Mo Xiang Tong Xiu',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    birthDate: '1988-06-09',
    nationality: 'China',
    bio: 'Autora de Mo Dao Zu Shi y Heaven Official\'s Blessing, dos de las novelas y manhuas más populares del género danmei. Sus obras han sido adaptadas a donghua, drama y audio drama.',
    works: ['Mo Dao Zu Shi', 'Heaven Official\'s Blessing', 'The Scum Villain\'s Self-Saving System'],
    awards: ['China Literature Award', 'IP Award']
  },
];

export const allContent: AnimeManga[] = [...animeData, ...mangaData, ...webtoonData, ...manhuaData, ...donghuaData, ...manhwaData];

export const categories = ['Anime', 'Manga', 'Manhwa', 'Webtoon', 'Manhua', 'Donghua', 'Eventos', 'Cultura Pop'];
export const genres = ['Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 'Romance', 'Terror', 'Ciencia Ficción', 'Sobrenatural', 'Shonen', 'Isekai', 'Slice of Life', 'Deportes', 'Juegos', 'BL', 'Magia', 'Cultivación', 'Vampiros', 'Histórico', 'Superhéroes'];

export const getTrending = () => {
  return [...allContent].sort((a, b) => b.rating - a.rating).slice(0, 10);
};

export const getNewReleases = () => {
  return [...allContent].filter(c => c.year >= 2025).slice(0, 10);
};

export const getByCategory = (category: string) => {
  return newsData.filter(n => n.category === category);
};

export const getByGenre = (genre: string) => {
  return allContent.filter(c => c.genres.includes(genre));
};

export const searchContent = (query: string) => {
  const q = query.toLowerCase();
  return {
    news: newsData.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q)),
    content: allContent.filter(c => c.title.toLowerCase().includes(q) || c.synopsis.toLowerCase().includes(q) || c.genres.some(g => g.toLowerCase().includes(q)))
  };
};
