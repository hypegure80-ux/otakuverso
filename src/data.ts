export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  image: string;
  featured: boolean;
  tags: string[];
  content: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  user: string;
  avatar: string;
  text: string;
  date: string;
  likes: number;
}

export interface AnimeItem {
  id: number;
  title: string;
  titleJp: string;
  type: 'anime' | 'manga' | 'webtoon' | 'manhua' | 'manhwa' | 'donghua';
  genres: string[];
  rating: number;
  episodes?: number;
  chapters?: number;
  status: 'En emisión' | 'Completado' | 'Próximamente';
  year: number;
  season?: string;
  studio?: string;
  synopsis: string;
  image: string;
  popularity: number;
  origin: 'japan' | 'korea' | 'china';
}

export interface Mangaka {
  id: number;
  name: string;
  nameJp: string;
  photo: string;
  birthDate: string;
  nationality: string;
  bio: string;
  works: string[];
  awards: string[];
  active: boolean;
}

export interface Opening {
  id: number;
  title: string;
  anime: string;
  artist: string;
  type: 'OP' | 'ED';
  season: string;
  year: number;
  videoUrl: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  artist: string;
  series: string;
  gradient: string;
  emoji: string;
  likes: number;
}

export interface ForumPost {
  id: number;
  title: string;
  author: string;
  avatar: string;
  category: string;
  content: string;
  date: string;
  replies: number;
  views: number;
  likes: number;
  pinned: boolean;
}

// ─── Gradient helpers for card backgrounds ─────────────────
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f5576c 0%, #ff6b35 100%)',
  'linear-gradient(135deg, #00d4ff 0%, #b829dd 100%)',
  'linear-gradient(135deg, #ff2d55 0%, #ff6b35 100%)',
  'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
];

export const emojis = ['⚔️','🌸','🔥','💫','🌊','🎭','👹','🐉','⭐','🌙','💎','🎌','🗡️','🦊','🎪'];

// ─── NEWS ──────────────────────────────────────────────────
export const newsData: NewsItem[] = [
  {
    id: 1,
    title: 'Chainsaw Man Parte 2 anuncia nueva saga con un giro impactante',
    summary: 'Tatsuki Fujimoto sorprende con un nuevo arco argumental que cambiará el rumbo de la serie para siempre.',
    category: 'Manga',
    date: '2025-12-15',
    image: gradients[0],
    featured: true,
    tags: ['Chainsaw Man', 'Manga', 'Shonen Jump'],
    content: 'El mangaka Tatsuki Fujimoto ha revelado en la última edición de Shonen Jump+ que Chainsaw Man entrará en una saga completamente nueva. Los fans están enloquecidos con las implicaciones de los últimos capítulos, donde Denji enfrenta una amenaza que supera todo lo visto anteriormente.',
    comments: [
      { id: 1, user: 'OtakuMaster', avatar: '🎭', text: '¡No puedo esperar! Fujimoto es un genio.', date: '2025-12-15', likes: 24 },
      { id: 2, user: 'MangaFan99', avatar: '📚', text: 'Esta serie siempre me sorprende.', date: '2025-12-15', likes: 18 },
    ]
  },
  {
    id: 2,
    title: 'Studio MAPPA anuncia nueva adaptación anime para 2026',
    summary: 'El estudio detrás de Jujutsu Kaisen y Attack on Titan revela su próximo gran proyecto anime.',
    category: 'Anime',
    date: '2025-12-14',
    image: gradients[1],
    featured: true,
    tags: ['MAPPA', 'Anime', 'Adaptación'],
    content: 'Studio MAPPA ha confirmado en un evento especial que adaptará uno de los mangas más populares del momento. Aunque el título aún no se ha revelado, las pistas apuntan a una serie de acción con elementos sobrenaturales.',
    comments: [
      { id: 1, user: 'AnimeLover', avatar: '🌸', text: 'MAPPA nunca decepciona con la animación.', date: '2025-12-14', likes: 31 },
    ]
  },
  {
    id: 3,
    title: 'Solo Leveling temporada 2 rompe récords de audiencia en Crunchyroll',
    summary: 'La segunda temporada del manhwa coreano adaptado al anime supera las expectativas globales.',
    category: 'Anime',
    date: '2025-12-13',
    image: gradients[2],
    featured: true,
    tags: ['Solo Leveling', 'Manhwa', 'Crunchyroll'],
    content: 'Solo Leveling Season 2: Arise from the Shadow ha batido todos los récords de visualización en Crunchyroll, consolidándose como una de las adaptaciones de manhwa más exitosas de la historia del anime.',
    comments: [
      { id: 1, user: 'SungJinWoo', avatar: '⚔️', text: '¡Arise! La mejor temporada.', date: '2025-12-13', likes: 45 },
    ]
  },
  {
    id: 4,
    title: 'Comiket 105: Las novedades más esperadas del evento',
    summary: 'El Comic Market de Tokio trae sorpresas, doujinshi exclusivos y anuncios importantes.',
    category: 'Evento',
    date: '2025-12-12',
    image: gradients[3],
    featured: false,
    tags: ['Comiket', 'Evento', 'Japón', 'Doujinshi'],
    content: 'El Comiket 105 ha cerrado sus puertas con cifras récord de asistencia. Entre las novedades más destacadas se encuentran anuncios exclusivos de nuevas series, colaboraciones especiales y doujinshi que se agotaron en minutos.',
    comments: []
  },
  {
    id: 5,
    title: 'Tower of God: Nueva temporada del webtoon confirma regreso triunfal',
    summary: 'SIU regresa con nuevos capítulos después de un hiatus prolongado.',
    category: 'Webtoon',
    date: '2025-12-11',
    image: gradients[4],
    featured: false,
    tags: ['Tower of God', 'Webtoon', 'SIU'],
    content: 'Después de meses de espera, SIU (Slave In Utero) ha confirmado su regreso con Tower of God. El webtoon coreano que revolucionó Naver retoma la historia de Bam con un arco que promete ser el más épico hasta la fecha.',
    comments: []
  },
  {
    id: 6,
    title: 'Eiichiro Oda celebra 28 años de One Piece con mensaje especial',
    summary: 'El creador de One Piece agradece a los fans y adelanta el clímax de la saga final.',
    category: 'Mangaka',
    date: '2025-12-10',
    image: gradients[5],
    featured: false,
    tags: ['One Piece', 'Oda', 'Mangaka'],
    content: 'Eiichiro Oda ha publicado un emotivo mensaje celebrando 28 años de serialización de One Piece. En la carta, Oda promete que la saga final será "algo que nadie se espera" y que cada momento de espera habrá valido la pena.',
    comments: []
  },
  {
    id: 7,
    title: 'Donghua "Heaven Official\'s Blessing" S3 arrasa en Bilibili',
    summary: 'La tercera temporada del donghua basado en la novela de MXTX supera 500 millones de reproducciones.',
    category: 'Donghua',
    date: '2025-12-09',
    image: gradients[6],
    featured: false,
    tags: ['Donghua', 'TGCF', 'Bilibili', 'China'],
    content: 'Heaven Official\'s Blessing (Tian Guan Ci Fu) continúa dominando las plataformas chinas con su tercera temporada, que ha logrado cifras impresionantes de audiencia y se ha convertido en el donghua más visto del año.',
    comments: []
  },
  {
    id: 8,
    title: 'K-pop y anime: La colaboración más inesperada del año',
    summary: 'Un grupo de K-pop interpretará el opening de la nueva temporada de un popular anime.',
    category: 'J-pop/K-pop',
    date: '2025-12-08',
    image: gradients[7],
    featured: false,
    tags: ['K-pop', 'Anime', 'Opening', 'Colaboración'],
    content: 'En un movimiento sin precedentes, un grupo de K-pop de primera línea ha sido seleccionado para interpretar el opening de uno de los animes más esperados de 2026. Esta colaboración marca una tendencia creciente de fusión entre la industria musical coreana y la animación japonesa.',
    comments: []
  },
  {
    id: 9,
    title: 'Demon Slayer: Infinity Castle confirma trilogía de películas',
    summary: 'ufotable adaptará el arco final de Kimetsu no Yaiba en tres películas cinematográficas.',
    category: 'Anime',
    date: '2025-12-07',
    image: gradients[8],
    featured: true,
    tags: ['Demon Slayer', 'ufotable', 'Película'],
    content: 'ufotable ha confirmado oficialmente que el arco de Infinity Castle de Demon Slayer será adaptado como una trilogía de películas. La primera entrega llegará a cines japoneses en verano de 2026, con estreno mundial programado para otoño del mismo año.',
    comments: []
  },
  {
    id: 10,
    title: 'AnimeJapan 2026: Fechas y primeros invitados confirmados',
    summary: 'El evento anime más grande de Japón prepara su edición más ambiciosa.',
    category: 'Evento',
    date: '2025-12-06',
    image: gradients[9],
    featured: false,
    tags: ['AnimeJapan', 'Evento', 'Tokio'],
    content: 'AnimeJapan 2026 se celebrará del 22 al 25 de marzo en Tokyo Big Sight. Los organizadores han prometido la edición más grande de la historia, con más de 200 expositores y paneles exclusivos de los estudios más importantes.',
    comments: []
  },
  {
    id: 11,
    title: 'Battle Through the Heavens alcanza el episodio 100 en su donghua',
    summary: 'El popular manhua/donghua chino celebra un hito histórico en la animación china.',
    category: 'Donghua',
    date: '2025-12-05',
    image: gradients[10],
    featured: false,
    tags: ['Donghua', 'Manhua', 'China', 'BTTH'],
    content: 'Battle Through the Heavens (Doupo Cangqiong) ha alcanzado su episodio 100, convirtiéndose en uno de los donghuas más longevos y exitosos de la industria china de animación.',
    comments: []
  },
  {
    id: 12,
    title: 'Spy x Family: Anya conquista los premios anime del año',
    summary: 'La serie de Tatsuya Endo arrasa en los galardones internacionales de anime.',
    category: 'Anime',
    date: '2025-12-04',
    image: gradients[11],
    featured: false,
    tags: ['Spy x Family', 'Premios', 'Anime'],
    content: 'Spy x Family ha ganado múltiples premios en las ceremonias internacionales de anime, incluyendo Mejor Serie, Mejor Personaje Femenino (Anya) y Mejor Banda Sonora. La serie continúa siendo un fenómeno cultural global.',
    comments: []
  },
];

// ─── CATALOG ───────────────────────────────────────────────
export const catalogData: AnimeItem[] = [
  {
    id: 1, title: 'Jujutsu Kaisen', titleJp: '呪術廻戦', type: 'anime',
    genres: ['Acción', 'Sobrenatural', 'Shonen'], rating: 8.9, episodes: 48,
    status: 'En emisión', year: 2023, season: 'Otoño', studio: 'MAPPA',
    synopsis: 'Yuji Itadori, un estudiante con una fuerza sobrehumana, se une a una organización secreta de hechiceros para eliminar una poderosa maldición después de ingerir un objeto maldito.',
    image: gradients[0], popularity: 98, origin: 'japan'
  },
  {
    id: 2, title: 'One Piece', titleJp: 'ワンピース', type: 'manga',
    genres: ['Aventura', 'Acción', 'Comedia', 'Shonen'], rating: 9.5, chapters: 1120,
    status: 'En emisión', year: 1997, studio: 'Shueisha',
    synopsis: 'Monkey D. Luffy y su tripulación de piratas buscan el legendario tesoro One Piece para convertirse en el Rey de los Piratas.',
    image: gradients[1], popularity: 100, origin: 'japan'
  },
  {
    id: 3, title: 'Solo Leveling', titleJp: '나 혼자만 레벨업', type: 'manhwa',
    genres: ['Acción', 'Fantasía', 'Aventura'], rating: 9.0, chapters: 201,
    status: 'Completado', year: 2018, studio: 'D&C Media',
    synopsis: 'Sung Jin-Woo, el cazador más débil de la humanidad, recibe un poder misterioso que le permite subir de nivel sin límites.',
    image: gradients[2], popularity: 96, origin: 'korea'
  },
  {
    id: 4, title: 'Tower of God', titleJp: '신의 탑', type: 'webtoon',
    genres: ['Acción', 'Aventura', 'Fantasía', 'Misterio'], rating: 8.7, chapters: 580,
    status: 'En emisión', year: 2010, studio: 'Naver',
    synopsis: 'Twenty-Fifth Bam entra a una torre misteriosa persiguiendo a su amiga Rachel, enfrentando pruebas cada vez más peligrosas.',
    image: gradients[3], popularity: 91, origin: 'korea'
  },
  {
    id: 5, title: 'Tian Guan Ci Fu', titleJp: '天官赐福', type: 'donghua',
    genres: ['Fantasía', 'Romance', 'Acción', 'Xianxia'], rating: 9.1, episodes: 36,
    status: 'En emisión', year: 2020, studio: 'Bilibili',
    synopsis: 'Xie Lian, un príncipe marcial que ascendió a la divinidad, se encuentra con el misterioso Rey Demonio Fantasma Hua Cheng.',
    image: gradients[4], popularity: 93, origin: 'china'
  },
  {
    id: 6, title: 'Doupo Cangqiong', titleJp: '斗破苍穹', type: 'manhua',
    genres: ['Acción', 'Fantasía', 'Artes Marciales'], rating: 8.2, chapters: 900,
    status: 'En emisión', year: 2012, studio: 'Zhiyin Animation',
    synopsis: 'Xiao Yan, un joven genio que perdió sus poderes, emprende un viaje para recuperar su fuerza y descubrir los secretos de su madre desaparecida.',
    image: gradients[5], popularity: 85, origin: 'china'
  },
  {
    id: 7, title: 'Demon Slayer', titleJp: '鬼滅の刃', type: 'anime',
    genres: ['Acción', 'Sobrenatural', 'Histórico'], rating: 9.2, episodes: 55,
    status: 'En emisión', year: 2019, season: 'Primavera', studio: 'ufotable',
    synopsis: 'Tanjiro Kamado busca una cura para su hermana convertida en demonio mientras se convierte en un cazador de demonios.',
    image: gradients[6], popularity: 97, origin: 'japan'
  },
  {
    id: 8, title: 'The Beginning After the End', titleJp: 'TBATE', type: 'manhwa',
    genres: ['Fantasía', 'Acción', 'Isekai'], rating: 8.8, chapters: 200,
    status: 'En emisión', year: 2018, studio: 'Tapas',
    synopsis: 'El rey Arthur Leywin reencarna en un mundo de magia y espadas, conservando los recuerdos y la experiencia de su vida pasada.',
    image: gradients[7], popularity: 89, origin: 'korea'
  },
  {
    id: 9, title: 'Fog Hill of Five Elements', titleJp: '雾山五行', type: 'donghua',
    genres: ['Acción', 'Fantasía', 'Artes Marciales'], rating: 8.6, episodes: 3,
    status: 'En emisión', year: 2020, studio: 'Nice Boat Animation',
    synopsis: 'En un mundo donde humanos y monstruos coexisten, guerreros elementales protegen la frontera entre ambos mundos.',
    image: gradients[8], popularity: 82, origin: 'china'
  },
  {
    id: 10, title: 'Attack on Titan', titleJp: '進撃の巨人', type: 'anime',
    genres: ['Acción', 'Drama', 'Fantasía', 'Seinen'], rating: 9.4, episodes: 94,
    status: 'Completado', year: 2013, season: 'Primavera', studio: 'WIT/MAPPA',
    synopsis: 'La humanidad lucha por su supervivencia contra gigantes humanoides que devoran personas sin razón aparente.',
    image: gradients[9], popularity: 99, origin: 'japan'
  },
  {
    id: 11, title: 'Omniscient Reader\'s Viewpoint', titleJp: '전지적 독자 시점', type: 'webtoon',
    genres: ['Acción', 'Aventura', 'Fantasía'], rating: 9.1, chapters: 180,
    status: 'En emisión', year: 2020, studio: 'Naver',
    synopsis: 'Kim Dokja es el único lector de una novela web que se convierte en realidad, y usa su conocimiento para sobrevivir.',
    image: gradients[10], popularity: 92, origin: 'korea'
  },
  {
    id: 12, title: 'Spy x Family', titleJp: 'スパイファミリー', type: 'anime',
    genres: ['Comedia', 'Acción', 'Slice of Life'], rating: 8.8, episodes: 37,
    status: 'En emisión', year: 2022, season: 'Primavera', studio: 'WIT/CloverWorks',
    synopsis: 'Un espía, una asesina y una telépata forman una familia falsa, cada uno con secretos que no pueden revelar.',
    image: gradients[11], popularity: 95, origin: 'japan'
  },
  {
    id: 13, title: 'Martial Peak', titleJp: '武炼巅峰', type: 'manhua',
    genres: ['Acción', 'Artes Marciales', 'Fantasía'], rating: 7.8, chapters: 3200,
    status: 'En emisión', year: 2017, studio: 'iQIYI',
    synopsis: 'Yang Kai, un humilde aprendiz, descubre un misterioso cristal negro que lo lleva por el camino del cultivo marcial supremo.',
    image: gradients[0], popularity: 80, origin: 'china'
  },
  {
    id: 14, title: 'Noblesse', titleJp: '노블레스', type: 'manhwa',
    genres: ['Acción', 'Sobrenatural', 'Comedia'], rating: 8.3, chapters: 544,
    status: 'Completado', year: 2007, studio: 'Naver',
    synopsis: 'Rai, un noble vampiro milenario, despierta en el mundo moderno y se adapta a la vida estudiantil mientras protege a sus seres queridos.',
    image: gradients[1], popularity: 86, origin: 'korea'
  },
  {
    id: 15, title: 'Mo Dao Zu Shi', titleJp: '魔道祖师', type: 'donghua',
    genres: ['Fantasía', 'Misterio', 'Acción', 'Xianxia'], rating: 9.0, episodes: 35,
    status: 'Completado', year: 2018, studio: 'B.CMAY',
    synopsis: 'Wei Wuxian, un cultivador que fue asesinado, reencarna 13 años después y se une a Lan Wangji para resolver una serie de misterios sobrenaturales.',
    image: gradients[2], popularity: 94, origin: 'china'
  },
  {
    id: 16, title: 'Bocchi the Rock!', titleJp: 'ぼっち・ざ・ろっく！', type: 'anime',
    genres: ['Comedia', 'Música', 'Slice of Life'], rating: 8.9, episodes: 12,
    status: 'Completado', year: 2022, season: 'Otoño', studio: 'CloverWorks',
    synopsis: 'Hitori Gotoh, una guitarrista introvertida y ansiosa, se une a una banda de rock y busca superar su miedo social a través de la música.',
    image: gradients[3], popularity: 88, origin: 'japan'
  },
  {
    id: 17, title: 'Frieren: Beyond Journey\'s End', titleJp: '葬送のフリーレン', type: 'anime',
    genres: ['Aventura', 'Drama', 'Fantasía'], rating: 9.3, episodes: 28,
    status: 'En emisión', year: 2023, season: 'Otoño', studio: 'Madhouse',
    synopsis: 'Frieren, una elfa maga que vivió mil años, emprende un viaje para comprender las emociones humanas después de la muerte de su compañero héroe.',
    image: gradients[4], popularity: 97, origin: 'japan'
  },
  {
    id: 18, title: 'Windbreaker', titleJp: '윈드브레이커', type: 'webtoon',
    genres: ['Acción', 'Drama', 'Deportes'], rating: 8.5, chapters: 450,
    status: 'En emisión', year: 2013, studio: 'Naver',
    synopsis: 'Un grupo de ciclistas callejeros compite en carreras ilegales por las calles de la ciudad en busca de velocidad y libertad.',
    image: gradients[5], popularity: 83, origin: 'korea'
  },
];

// ─── MANGAKAS ──────────────────────────────────────────────
export const mangakaData: Mangaka[] = [
  {
    id: 1, name: 'Eiichiro Oda', nameJp: '尾田栄一郎',
    photo: '🏴‍☠️', birthDate: '1 de enero, 1975', nationality: 'Japonés',
    bio: 'Creador de One Piece, la serie manga más vendida de la historia con más de 500 millones de copias. Su obra ha definido el género shonen durante casi tres décadas.',
    works: ['One Piece', 'Wanted!', 'Romance Dawn'],
    awards: ['Premio Tezuka', 'Guinness World Record'], active: true
  },
  {
    id: 2, name: 'Hajime Isayama', nameJp: '諫山創',
    photo: '⚔️', birthDate: '29 de agosto, 1986', nationality: 'Japonés',
    bio: 'Creador de Attack on Titan (Shingeki no Kyojin), una de las series más influyentes del manga moderno que revolucionó el género de fantasía oscura.',
    works: ['Attack on Titan', 'Heart Break One'],
    awards: ['Premio Kodansha Manga', 'Harvey Award'], active: false
  },
  {
    id: 3, name: 'Gege Akutami', nameJp: '芥見下々',
    photo: '👁️', birthDate: '26 de febrero, 1992', nationality: 'Japonés',
    bio: 'Creador de Jujutsu Kaisen, una de las series más populares de la revista Weekly Shonen Jump. Su estilo combina acción brutal con una narrativa profunda.',
    works: ['Jujutsu Kaisen', 'Kamishiro Sousa'],
    awards: ['Next Manga Award'], active: true
  },
  {
    id: 4, name: 'Tatsuki Fujimoto', nameJp: '藤本タツキ',
    photo: '🔥', birthDate: '10 de octubre, 1992', nationality: 'Japonés',
    bio: 'Creador de Chainsaw Man y Fire Punch. Conocido por su narrativa impredecible y su capacidad para mezclar horror, acción y comedia de manera única.',
    works: ['Chainsaw Man', 'Fire Punch', 'Look Back', 'Goodbye, Eri'],
    awards: ['Harvey Award', 'Eisner Award Nominado'], active: true
  },
  {
    id: 5, name: 'Rumiko Takahashi', nameJp: '高橋留美子',
    photo: '🌟', birthDate: '10 de octubre, 1957', nationality: 'Japonesa',
    bio: 'Leyenda del manga y creadora de clásicos como Inuyasha, Ranma ½ y Urusei Yatsura. Es una de las mangakas más exitosas y prolíficas de la historia.',
    works: ['Inuyasha', 'Ranma ½', 'Urusei Yatsura', 'Maison Ikkoku'],
    awards: ['Premio Shogakukan', 'Gran Premio de Angoulême', 'Eisner Award'], active: true
  },
  {
    id: 6, name: 'CLAMP', nameJp: 'クランプ',
    photo: '✨', birthDate: 'Grupo fundado en 1987', nationality: 'Japonés',
    bio: 'Grupo de mangakas formado por cuatro mujeres, responsable de obras icónicas como Cardcaptor Sakura, xxxHolic y Tsubasa Reservoir Chronicle.',
    works: ['Cardcaptor Sakura', 'xxxHOLiC', 'Tsubasa', 'X/1999', 'Chobits'],
    awards: ['Premio Kodansha', 'Premio Seiun'], active: true
  },
  {
    id: 7, name: 'SIU (Slave In Utero)', nameJp: 'SIU',
    photo: '🗼', birthDate: 'no revelado', nationality: 'Coreano',
    bio: 'Creador de Tower of God, uno de los webtoons más populares y largos de la plataforma Naver. Su obra ha sido adaptada a anime por Telecom Animation Film.',
    works: ['Tower of God'],
    awards: ['Best Webtoon Award'], active: true
  },
  {
    id: 8, name: 'Mo Xiang Tong Xiu (MXTX)', nameJp: '墨香铜臭',
    photo: '🌺', birthDate: 'no revelado', nationality: 'China',
    bio: 'Autora de las novelas web más populares de China incluyendo Mo Dao Zu Shi, Tian Guan Ci Fu y Scum Villain, todas adaptadas a donghua exitosos.',
    works: ['Mo Dao Zu Shi', 'Tian Guan Ci Fu', 'Scum Villain\'s Self-Saving System'],
    awards: ['Más leída en JJWXC'], active: true
  },
];

// ─── OPENINGS / ENDINGS ───────────────────────────────────
export const openingsData: Opening[] = [
  { id: 1, title: 'Kaikai Kitan', anime: 'Jujutsu Kaisen', artist: 'Eve', type: 'OP', season: 'Otoño', year: 2020, videoUrl: 'https://www.youtube.com/watch?v=4lSAB6VMwCo' },
  { id: 2, title: 'Gurenge', anime: 'Demon Slayer', artist: 'LiSA', type: 'OP', season: 'Primavera', year: 2019, videoUrl: 'https://www.youtube.com/watch?v=pmanD_s7G3U' },
  { id: 3, title: 'Zankyou Sanka', anime: 'Demon Slayer S2', artist: 'Aimer', type: 'OP', season: 'Invierno', year: 2022, videoUrl: 'https://www.youtube.com/watch?v=5hJepWBUqZk' },
  { id: 4, title: 'Mixed Nuts', anime: 'Spy x Family', artist: 'Official HIGE DANdism', type: 'OP', season: 'Primavera', year: 2022, videoUrl: 'https://www.youtube.com/watch?v=__Z6dIIuCVo' },
  { id: 5, title: 'SPECIALZ', anime: 'Jujutsu Kaisen S2', artist: 'King Gnu', type: 'OP', season: 'Verano', year: 2023, videoUrl: 'https://www.youtube.com/watch?v=NJfykJoIXJM' },
  { id: 6, title: 'Yūsha', anime: 'Frieren', artist: 'YOASOBI', type: 'OP', season: 'Otoño', year: 2023, videoUrl: 'https://www.youtube.com/watch?v=b9Wlx7FG_LU' },
  { id: 7, title: 'Kick Back', anime: 'Chainsaw Man', artist: 'Kenshi Yonezu', type: 'OP', season: 'Otoño', year: 2022, videoUrl: 'https://www.youtube.com/watch?v=dFlDRhvM4L0' },
  { id: 8, title: 'Seishun Complex', anime: 'Bocchi the Rock!', artist: 'Kessoku Band', type: 'OP', season: 'Otoño', year: 2022, videoUrl: 'https://www.youtube.com/watch?v=ocR5bJBg_YI' },
  { id: 9, title: 'Shinzou wo Sasageyo!', anime: 'Attack on Titan S2', artist: 'Linked Horizon', type: 'OP', season: 'Primavera', year: 2017, videoUrl: 'https://www.youtube.com/watch?v=LKP-vZvjbh8' },
  { id: 10, title: 'LEveL', anime: 'Solo Leveling', artist: 'SawanoHiroyuki[nZk]:TOMORROW X TOGETHER', type: 'OP', season: 'Invierno', year: 2024, videoUrl: 'https://www.youtube.com/watch?v=H1WfNHIF_KM' },
  { id: 11, title: 'Lost in Paradise', anime: 'Jujutsu Kaisen', artist: 'ALI', type: 'ED', season: 'Otoño', year: 2020, videoUrl: 'https://www.youtube.com/watch?v=6riDJEmnIU0' },
  { id: 12, title: 'Cry Baby', anime: 'Tokyo Revengers', artist: 'Official HIGE DANdism', type: 'OP', season: 'Primavera', year: 2021, videoUrl: 'https://www.youtube.com/watch?v=j-VDnLETRvs' },
];

// ─── GALLERY ──────────────────────────────────────────────
export const galleryData: GalleryImage[] = [
  { id: 1, title: 'Gojo Satoru - Dominio Infinito', artist: '@artmaster', series: 'Jujutsu Kaisen', gradient: gradients[0], emoji: '💜', likes: 2453 },
  { id: 2, title: 'Luffy Gear 5 Joy Boy', artist: '@onepiecefan', series: 'One Piece', gradient: gradients[1], emoji: '☀️', likes: 3891 },
  { id: 3, title: 'Tanjiro vs Muzan Final', artist: '@demonart', series: 'Demon Slayer', gradient: gradients[6], emoji: '🔥', likes: 1876 },
  { id: 4, title: 'Sung Jin-Woo Shadow Army', artist: '@shadowking', series: 'Solo Leveling', gradient: gradients[2], emoji: '⚔️', likes: 2234 },
  { id: 5, title: 'Anya Forger Waku Waku', artist: '@spyfamily', series: 'Spy x Family', gradient: gradients[3], emoji: '🥜', likes: 4102 },
  { id: 6, title: 'Eren Yeager Freedom', artist: '@titanart', series: 'Attack on Titan', gradient: gradients[9], emoji: '🦅', likes: 3456 },
  { id: 7, title: 'Xie Lian y Hua Cheng', artist: '@tgcfart', series: 'Tian Guan Ci Fu', gradient: gradients[4], emoji: '🌸', likes: 2890 },
  { id: 8, title: 'Wei Wuxian Yiling Patriarch', artist: '@mdzsart', series: 'Mo Dao Zu Shi', gradient: gradients[10], emoji: '🎶', likes: 2145 },
  { id: 9, title: 'Bocchi Guitar Hero', artist: '@rockart', series: 'Bocchi the Rock!', gradient: gradients[3], emoji: '🎸', likes: 1987 },
  { id: 10, title: 'Frieren Contemplando', artist: '@frierenart', series: 'Frieren', gradient: gradients[7], emoji: '🧙‍♀️', likes: 3210 },
  { id: 11, title: 'Denji Chainsaw Devil', artist: '@chainsawart', series: 'Chainsaw Man', gradient: gradients[8], emoji: '🪚', likes: 2678 },
  { id: 12, title: 'Bam Tower Climb', artist: '@togfan', series: 'Tower of God', gradient: gradients[5], emoji: '🗼', likes: 1543 },
];

// ─── FORUM POSTS ──────────────────────────────────────────
export const forumData: ForumPost[] = [
  { id: 1, title: '¿Cuál es el mejor arco de One Piece?', author: 'NakamaCrew', avatar: '🏴‍☠️', category: 'Discusión', content: 'Para mí Water 7/Enies Lobby sigue siendo insuperable, pero Wano está muy cerca. ¿Ustedes qué opinan?', date: '2025-12-15', replies: 87, views: 2340, likes: 156, pinned: true },
  { id: 2, title: 'Ranking definitivo: Top 10 openings de anime 2024', author: 'MusicOtaku', avatar: '🎵', category: 'Rankings', content: 'He recopilado los mejores OPs del año basándome en producción, letra y popularidad. ¡Compartan los suyos!', date: '2025-12-14', replies: 45, views: 1890, likes: 98, pinned: false },
  { id: 3, title: 'Mejores manhwa para leer en 2025', author: 'WebtoonAddict', avatar: '📱', category: 'Recomendaciones', content: 'Si aún no has leído Solo Leveling, TBATE y ORV, estás perdiéndote de joyas increíbles.', date: '2025-12-13', replies: 62, views: 3450, likes: 201, pinned: true },
  { id: 4, title: '¿Por qué el donghua está ganando tanta popularidad?', author: 'DonghuaFan', avatar: '🐉', category: 'Discusión', content: 'La calidad de animación china ha mejorado enormemente. Series como TGCF y MDZS están al nivel de muchos animes japoneses.', date: '2025-12-12', replies: 38, views: 1560, likes: 89, pinned: false },
  { id: 5, title: 'Mi experiencia en el Comiket 105', author: 'TokyoTraveler', avatar: '✈️', category: 'Experiencias', content: 'Acabo de regresar del Comiket y fue una experiencia increíble. Aquí les cuento todo lo que vi y compré.', date: '2025-12-11', replies: 23, views: 980, likes: 67, pinned: false },
  { id: 6, title: 'Teorías sobre el final de Jujutsu Kaisen', author: 'CursedTheory', avatar: '👁️', category: 'Teorías', content: 'Después de los últimos capítulos, tengo una teoría sobre cómo Gege Akutami cerrará la historia. SPOILERS ADELANTE.', date: '2025-12-10', replies: 112, views: 5670, likes: 345, pinned: false },
  { id: 7, title: 'Guía para empezar con el manhua chino', author: 'ManhuaExpert', avatar: '📖', category: 'Guías', content: 'Si quieres entrar al mundo del manhua, aquí te dejo una guía completa con los mejores títulos para comenzar.', date: '2025-12-09', replies: 29, views: 1230, likes: 78, pinned: false },
];

// ─── GENRES ───────────────────────────────────────────────
export const allGenres = [
  'Acción', 'Aventura', 'Comedia', 'Drama', 'Fantasía', 'Romance',
  'Sobrenatural', 'Misterio', 'Slice of Life', 'Deportes', 'Música',
  'Shonen', 'Seinen', 'Shojo', 'Histórico', 'Isekai', 'Artes Marciales',
  'Xianxia', 'Horror', 'Ciencia Ficción'
];

export const allTypes = ['anime', 'manga', 'webtoon', 'manhua', 'manhwa', 'donghua'];
export const allStatus = ['En emisión', 'Completado', 'Próximamente'];
export const allSeasons = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
export const allOrigins = [
  { key: 'japan', label: 'Japón 🇯🇵' },
  { key: 'korea', label: 'Corea del Sur 🇰🇷' },
  { key: 'china', label: 'China 🇨🇳' },
];

// ─── TRENDING ─────────────────────────────────────────────
export const trendingTopics = [
  { tag: '#ChainsawMan', count: '125K' },
  { tag: '#JujutsuKaisen', count: '98K' },
  { tag: '#SoloLeveling', count: '87K' },
  { tag: '#OnePiece', count: '156K' },
  { tag: '#DemonSlayer', count: '72K' },
  { tag: '#Frieren', count: '65K' },
  { tag: '#Donghua', count: '43K' },
  { tag: '#Manhwa', count: '52K' },
  { tag: '#TGCF', count: '38K' },
  { tag: '#BocchiTheRock', count: '31K' },
];
