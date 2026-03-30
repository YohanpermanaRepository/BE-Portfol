const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting to seed the database...');

  // 1. Create Profile
  console.log('📝 Creating profile...');
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Yohan Permana',
      profileImage: 'https://via.placeholder.com/400',
      description: 'Fullstack Developer with passion for building amazing web applications'
    }
  });
  console.log('✅ Profile created:', profile);

  // 2. Create Contact
  console.log('\n📞 Creating contact info...');
  const contact = await prisma.contact.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: 'yohan@example.com',
      instagram: '@yohanpermana',
      youtube: 'Yohan Permana',
      linkedin: 'linkedin.com/in/yohanpermana',
      description: 'Feel free to reach out!'
    }
  });
  console.log('✅ Contact created:', contact);

  // 3. Create About
  console.log('\n💬 Creating about section...');
  const about = await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      description: 'I am a passionate fullstack developer with 5+ years of experience building web applications.',
      images: {
        create: [
          { imageUrl: 'https://via.placeholder.com/500x300' },
          { imageUrl: 'https://via.placeholder.com/500x300' }
        ]
      }
    },
    include: { images: true }
  });
  console.log('✅ About created:', about);

  // 4. Create Technologies
  console.log('\n⚙️ Creating technologies...');
  const technologies = await Promise.all([
    prisma.technology.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Typescript' },
      update: {},
      create: { name: 'Typescript', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1024px-Typescript_logo_2020.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Tailwind CSS' },
      update: {},
      create: { name: 'Tailwind CSS', icon: 'https://www.svgrepo.com/show/374118/tailwind.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'Chart.js' },
      update: {},
      create: { name: 'Chart.js', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Chart.js_logo.svg/1200px-Chart.js_logo.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: { name: 'Node.js', icon: 'https://www.mindrops.com/images/nodejs-image.webp' }
    }),
    prisma.technology.upsert({
      where: { name: 'PostgreSQL' },
      update: {},
      create: { name: 'PostgreSQL', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1985px-Postgresql_elephant.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Boootstrap' },
      update: {},
      create: { name: 'Boootstrap', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'MongoDB' },
      update: {},
      create: { name: 'MongoDB', icon: 'https://gigabitscloud.com/wp-content/uploads/2024/11/mongodb-logo.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Flask' },
      update: {},
      create: { name: 'Flask', icon: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flask-logo-icon.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Saas' },
      update: {},
      create: { name: 'Saas', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2560px-Sass_Logo_Color.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'PWA' },
      update: {},
      create: { name: 'PWA', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6R-dIxFatrRXZY9M4vgsM_Bg2qR7AY2mmTQ&s' }
    }),
    prisma.technology.upsert({
      where: { name: 'Workbox' },
      update: {},
      create: { name: 'Workbox', icon: 'https://user-images.githubusercontent.com/110953/28352645-7a8a66d8-6c0c-11e7-83af-752609e7e072.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Playwright ' },
      update: {},
      create: { name: 'Playwright ', icon: 'https://gimgs2.nohat.cc/thumb/f/640/playwright-logo-vector--comseeklogo435674.jpg' }
    }),
    prisma.technology.upsert({
      where: { name: 'Vercel' },
      update: {},
      create: { name: 'Vercel', icon: 'https://raw.githubusercontent.com/DataDog/integrations-extras/master/vercel/images/logo-full-black.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Express' },
      update: {},
      create: { name: 'Express', icon: 'https://miro.medium.com/v2/resize:fit:1400/1*i2fRBk3GsYLeUk_Rh7AzHw.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Cloudinary' },
      update: {},
      create: { name: 'Cloudinary', icon: 'https://appexchange.salesforce.com/image_host/54d359f8-a104-40ee-b94c-91488f80db81.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Javascript' },
      update: {},
      create: { name: 'Javascript', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Html' },
      update: {},
      create: { name: 'Html', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Vite' },
      update: {},
      create: { name: 'Vite', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/779px-Vitejs-logo.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Mysql' },
      update: {},
      create: { name: 'Mysql', icon: 'https://images.seeklogo.com/logo-png/9/2/mysql-logo-png_seeklogo-96578.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'CSS' },
      update: {},
      create: { name: 'CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/851px-CSS3_logo_and_wordmark.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'PHP' },
      update: {},
      create: { name: 'PHP', icon: 'https://logowik.com/content/uploads/images/php.jpg' }
    }),
    prisma.technology.upsert({
      where: { name: 'Java' },
      update: {},
      create: { name: 'Java', icon: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/181_Java_logo_logos-512.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Scikit-learn' },
      update: {},
      create: { name: 'Scikit-learn', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Scikit_learn_logo_small.svg/1200px-Scikit_learn_logo_small.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Python' },
      update: {},
      create: { name: 'Python', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2048px-Python-logo-notext.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Pytorch' },
      update: {},
      create: { name: 'Pytorch', icon: 'https://pbs.twimg.com/profile_images/1813965160702451712/yXV1vRhr_400x400.jpg' }
    }),
    prisma.technology.upsert({
      where: { name: 'Tensorflow' },
      update: {},
      create: { name: 'Tensorflow', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/TensorFlow_logo.svg/1200px-TensorFlow_logo.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Webpack' },
      update: {},
      create: { name: 'Webpack', icon: 'https://webpack.js.org/icon-pwa-512x512.934507c816afbcdb.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Netlify' },
      update: {},
      create: { name: 'Netlify', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Netlify_logo_%282%29.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'EsLint' },
      update: {},
      create: { name: 'EsLint', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/1200px-ESLint_logo.svg.png' }
    }),
    prisma.technology.upsert({
      where: { name: 'Framer Motion' },
      update: {},
      create: { name: 'Framer Motion', icon: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'filess.io' },
      update: {},
      create: { name: 'filess.io', icon: 'https://filess.io/favicon.svg' }
    })
  ]);
  console.log('✅ Technologies created:', technologies.map(t => t.name).join(', '));

  // 5. Create Projects
  console.log('\n🎨 Creating projects...');
  await prisma.project.deleteMany({});

  const projects = await Promise.all([
    prisma.project.create({
      data: {
        id: 8,
        title: 'SPK Pemilihan Guru Terbaik Berdasarkan Nilai Kinerja (PHP Native)',
        description: 'Sistem Pendukung Keputusan Pemilihan Guru Terbaik Berdasarkan Nilai Kinerja merupakan proyek tugas akhir pada mata kuliah Sistem Pendukung Keputusan. Proyek ini berbasis web dengan PHP native, dan menggunakan metode Weighted Product (WP) sebagai metode pengambilan keputusan. Kriteria yang digunakan meliputi kehadiran, ketertiban, tugas, sikap, dan kemampuan. Selain itu, perhitungan juga dilakukan secara manual menggunakan Microsoft Excel untuk memverifikasi akurasi hasil penilaian. (2023)',
        githubLink: 'https://github.com/YohanpermanaRepository/Project-Sistem-Pendukung-Keputusan-Metode-WP-Penilaian-Kinerja-Guru-Berbasis-WEB-php-',
        demoLink: null,
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763037652/portfolio_assets/ddvxgurtonrfm0uctzo0.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763037723/portfolio_assets/vg79l29kkmmydcy99oxx.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763037740/portfolio_assets/cxn4hozbtizc8osgeqt6.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763037759/portfolio_assets/fzxwg79cqrved3gtvw3b.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 9,
        title: 'Java Android Mobile Smart-Finance',
        description: 'Project ini merupakan hasil kerja tim dalam lomba UKM-FT ITC untuk pengembangan aplikasi mobile Android menggunakan Java. Aplikasi Smart Finance ini berfungsi untuk mencatat keuangan, baik pemasukan maupun pengeluaran, serta menyediakan fitur reporting. Desain antarmuka dibuat menggunakan Figma, dan pengembangan kode dilakukan dengan Android Studio. (2023)',
        githubLink: 'https://github.com/YohanpermanaRepository/Project-Apps-android-mobile-Smart-Finance/blob/main/Prototype%20Figma.png',
        demoLink: null,
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763018760/portfolio_assets/lxhpgjdpgpnohn9mpnez.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763036757/portfolio_assets/jvc71wiipmrfbe5bykgi.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 10,
        title: 'Analisis Sentimen Berbasis Aspek Aplikasi Edlink',
        description: 'Project ini merupakan proyek Data Science berbasis NLP yang digunakan untuk analisis sentimen berbasis aspek. Metode SVM diterapkan untuk klasifikasi sentimen positif dan negatif, model lexicon digunakan untuk pelabelan, serta LDA digunakan untuk topic modeling ke dalam aspek usability, performance, dan efisiensi. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/ANALISIS-SENTIMEN-BERBASIS-ASPEK-APLIKASI-PEMBELAJARAN-EDLINK-METODE-LDA-SVM-LEXICON-BASED',
        demoLink: 'https://www.youtube.com/watch?v=LM19lpjMalQ&t=2763s',
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763019457/portfolio_assets/u38x6kcxypvbyvfkjufz.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763019473/portfolio_assets/dndjcz0ir55bw3tv0chy.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763019489/portfolio_assets/jndj9ybts61hf6arwzok.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763019508/portfolio_assets/dhscvzvivjp4lvj0zwyy.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 11,
        title: 'Generative Adversarial Network Pewarnaan Otomatis Batik',
        description: 'Project ini merupakan hasil riset MBKM bersama dosen pada semester 7. Proyek ini menggunakan model deep learning GAN untuk automatic coloring, mentransformasikan gambar batik grayscale menjadi berwarna, dengan penerapan model GAN Pix2pix dengan TensorFlow, & PyTorch. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/Pix2pixyohan',
        demoLink: 'https://gancoloringbatikv2.streamlit.app/',
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763035378/portfolio_assets/q4noj2hlaaiyrs8pcvtq.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763035394/portfolio_assets/ublforhbjotwoxmbt94p.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763036203/portfolio_assets/hbw5berb99cty7acncia.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763039971/portfolio_assets/k7wnt9ek49yc9wkmf6hd.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 12,
        title: 'Forecasting DBMA Saham-Bursa-Efek Indonesia Native PHP',
        description: 'Pada project ini merupakan hasil dari project tugas akhir mata kuliah forecasting bisnis dimana mengimplementasikan web native PHP pada metode Double Moving Average pada data Saham-Bursa-Efek Indonesia. (2023)',
        githubLink: 'https://github.com/YohanpermanaRepository/DBMA-Saham-Bursa-Efek-Indonesia/blob/main/hasil.php',
        demoLink: null,
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763035124/portfolio_assets/cyssrns7dfqbdrzspwvo.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763035135/portfolio_assets/zdc2of2u4m6monfa9mxr.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 21,
        title: 'Native BMI',
        description: 'Project ini merupakan submission pada awal masa studi MSIB Dicoding dalam kelas Pemrograman Web Dasar, yang dibuat menggunakan native HTML, CSS, dan JavaScript. Proyek ini menjadi dasar bagi saya Pendalaman HTML symantic html, Pendalaman CSS color, box model, shadow, positioning, layouting model query, hingga Layout Responsif dengan Flexbox. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/Website-bmi-nativeDicodingYohan.io',
        demoLink: 'https://yohanpermanarepository.github.io/Website-bmi-nativeDicodingYohan.io/',
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763013311/portfolio_assets/kylnocnpnqceozheiwbk.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763013323/portfolio_assets/hcoumns7to2fda871fap.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763013336/portfolio_assets/gefcfh2esjluwgv4cqqr.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763034413/portfolio_assets/a2whtcttjg9xdiqf1aal.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 22,
        title: 'Bookshelf App',
        description: 'Merupakan project submision Front-End pertama saya dalam studi  MSIB Dicoding Cycle 6 dimana mempelajari dan menerapkan penerapan BOM dan DOM, Interaktif dengan Event dan Penyimpanan Data dengan Web Storage yang di implementasikan dalam bentuk rak buku simpan pinjam perpustakaan. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/FE-1.io',
        demoLink: 'https://yohanpermanarepository.github.io/FE-1.io/',
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040178/portfolio_assets/ipmdxiiifrhfcm94yso7.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040189/portfolio_assets/gn12pmylzocyqb60hmfm.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040202/portfolio_assets/pm8zepjdl9vugqgpbxcy.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040215/portfolio_assets/fdbgby0g27zwtgwjkmnv.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 23,
        title: 'Notes App RESTful API',
        description: 'Merupakan project lanjutan dalam submision fundamental Front-End studi  MSIB Dicoding Cycle 6 dimana dalam project ini mempelajari dan mengimplementasikan HTML Form Lanjutan  block scope variable, template literals, destructuring object dll, Teknik Layouting dengan CSS Grid, Web Componen, Package Manager untuk Aplikasi Web, Bundel dengan Module Bundler, Asynchronous JavaScript Request. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/FE2',
        demoLink: null,
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763039448/portfolio_assets/xrcq5dvj6heakrgu2ynb.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763039460/portfolio_assets/iuesvrh1vcta7gdg2xit.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763039588/portfolio_assets/natizt5d2du0rv6phhnr.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763039598/portfolio_assets/uysjy47jdgvafxviwc2i.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 24,
        title: 'Katalog Restoran PWA + Testing and Optimized',
        description: 'Merupakan project lanjutan Front-End expert dalam studi  MSIB Dicoding Cycle 6  dimana mempelajari dan menerapkan Mobile First Approach, Aksesibilitas, JavaScript Clean Code, Progressive Web Apps (PWA), Automation Testing, Web Performance menggunakan web auditor, Deployment dengan CI/CD teknik Continuous Integration/Continuous Deployment. (2024)',
        githubLink: 'https://github.com/YohanpermanaRepository/RestoapppDicoding',
        demoLink: 'https://yohanrestoapp.netlify.app/',
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763017802/portfolio_assets/mnvzqhzcqf564rovcitq.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763017821/portfolio_assets/q7an9yf3dpoivpmeqczy.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763017836/portfolio_assets/u4gyz2mqnseximr3wa1q.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763017848/portfolio_assets/jqytn1cfiu5dwqwjzyc2.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 25,
        title: 'Wisata Kuliner Madura',
        description: 'Merupakan  capstone project program MSIB Dicoding saya berperan sebagai Full-Stack Developer sekaligus Team Lead. Wisata Kuliner Madura adalah aplikasi web berbasis PWA dengan support offline capability yang menampilkan informasi makanan khas, dilengkapi fitur feedback, rating, bookmark, dan artikel wisata. Aplikasi ini dibangun menggunakan RESTful API hingga melakukan E2E test Playwright serta dilengkapi dengan fitur CMS. (Juli 2024)',
        githubLink: 'https://github.com/C624-PS145/C624-PS145',
        demoLink: 'https://youtu.be/YLyJdAF-e-4',
        isFeatured: true,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040285/portfolio_assets/ltl9rup45knna45kcyuj.png' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040301/portfolio_assets/xmagshuue4v2llr1kc5i.png' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040318/portfolio_assets/pohe2nbmjoqhdmryjiww.png' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763040330/portfolio_assets/wvr0mwzwq5xqkk03fjpp.png' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 26,
        title: 'React SPA + API, Context, dan Hooks',
        description: 'Project ini merupakan submission dari kelas Belajar Fundamental Aplikasi Web dengan React di Dicoding, di mana saya mempelajari dan mengimplementasikan berbagai konsep React seperti React UI Component, Stateful Component, Property Validation, React Router, Component Lifecycle, React Context, dan React Hooks. Semua konsep tersebut diterapkan dalam pembuatan aplikasi CRUD catatan sederhana yang memiliki fitur registrasi dan login translate & theme dan menggunakan API dari Dicoding. (Oktober 2025)',
        githubLink: 'https://github.com/YohanpermanaRepository/RE2',
        demoLink: null,
        isFeatured: false,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763029879/portfolio_assets/sdxzx0lyariikaiqyk5n.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763029508/portfolio_assets/oggtkdlgtshb0k4acrha.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763029522/portfolio_assets/hv32or9n8d5qwrnphaq3.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763029535/portfolio_assets/gevaftia887r7whz2vt6.jpg' }
          ]
        }
      },
      include: { images: true }
    }),
    prisma.project.create({
      data: {
        id: 27,
        title: 'YP Portfolio',
        description: 'Merupakan project portfolio yang saya bangun secara mandiri sebagai latihan pengembangan aplikasi fullstack. Proyek ini menerapkan RESTful API dan terdiri dari tiga bagian utama, yaitu Frontend User untuk tampilan website portfolio dan Frontend CMS untuk manajemen konten, keduanya dibangun menggunakan kombinasi React dan TypeScript dengan styling Tailwind Css dan animasi interaktif dari Framer Motion serta optimasi gambar melalui Lazy Load. Pada sisi backend, proyek ini menggunakan Express.js dengan database MySQL serta integrasi fitur AI Chatbot yang memanfaatkan Google API untuk memberikan pengalaman interaktif bagi pengunjung. Fitur utama dalam website ini meliputi penampilan project, pengalaman kerja, pendidikan, dan sertifikasi, yang dirancang agar mudah digunakan, informatif, dan menarik secara visual, dengan tujuan utama menampilkan hasil karya serta kemampuan saya dalam bidang IT terutama pengembangan website.',
        githubLink: 's',
        demoLink: null,
        isFeatured: true,
        images: {
          create: [
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763044765/portfolio_assets/knwtrxhwpfwqnmwhmxxv.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048326/portfolio_assets/n6cw3tqci91sohjr9ulf.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048377/portfolio_assets/eiujejnh6kju5cvyclpc.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048421/portfolio_assets/rpoycqdalsp2gwijaekl.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048458/portfolio_assets/rdghn6xzxwtkzutu7ake.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048487/portfolio_assets/zerhvsp13sfell3cdcnj.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048581/portfolio_assets/cgs1dpq98dqhxhjdpruy.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048663/portfolio_assets/dfwwjv2d2egpcw3rkwuq.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048719/portfolio_assets/edkn2tpf4tzzy1kxkswd.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048758/portfolio_assets/i6m8vtmgoeghyuy713nz.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048809/portfolio_assets/z489wdmxgkkfpbbosyuh.jpg' },
            { imageUrl: 'https://res.cloudinary.com/dyvau3bn4/image/upload/v1763048865/portfolio_assets/z8bi3mmgfeanmyt2qkkl.jpg' }
          ]
        }
      },
      include: { images: true }
    })
  ]);
  console.log('✅ Projects created:', projects.length, 'projects');

  // 5.1 Connect Projects with Technologies
  console.log('\n🔗 Connecting projects with technologies...');
  const projectTechs = [
    { projectId: 8, techNames: ['PHP'] },
    { projectId: 9, techNames: ['Java'] },
    { projectId: 10, techNames: ['Scikit-learn', 'Python'] },
    { projectId: 11, techNames: ['Python', 'Pytorch', 'Tensorflow'] },
    { projectId: 12, techNames: ['Javascript', 'PHP'] },
    { projectId: 21, techNames: ['Javascript', 'Html', 'CSS'] },
    { projectId: 22, techNames: ['Javascript', 'Html', 'CSS'] },
    { projectId: 23, techNames: ['Node.js', 'Javascript', 'Html', 'CSS'] },
    { projectId: 24, techNames: ['Node.js', 'PWA', 'Playwright ', 'Javascript', 'Html', 'CSS', 'Webpack', 'EsLint'] },
    { projectId: 25, techNames: ['Node.js', 'Saas', 'PWA', 'Workbox', 'Playwright ', 'Vercel', 'Cloudinary', 'Javascript', 'Html', 'Mysql', 'Webpack', 'Netlify', 'EsLint'] },
    { projectId: 26, techNames: ['React', 'Node.js', 'Vite', 'CSS'] },
    { projectId: 27, techNames: ['React', 'Typescript', 'Tailwind CSS', 'Node.js', 'Vercel', 'Express', 'Vite', 'Mysql', 'Netlify', 'Framer Motion', 'filess.io'] }
  ];

  for (const { projectId, techNames } of projectTechs) {
    for (const techName of techNames) {
      const tech = await prisma.technology.findUnique({
        where: { name: techName }
      });
      if (tech) {
        await prisma.projectTechnology.upsert({
          where: { projectId_technologyId: { projectId, technologyId: tech.id } },
          update: {},
          create: { projectId, technologyId: tech.id }
        });
      }
    }
  }
  console.log('✅ Project-Technology relationships created');

  // 6. Create Certifications
  console.log('\n🏆 Creating certifications...');
  await prisma.certification.deleteMany({});

  const certifications = await prisma.certification.createMany({
    data: [
      {
        id: 1,
        category: 'Networking and Infrastructure',
        name: 'CCNAv7: Introduction to Networks',
        issuer: 'Cisco Networking Academy',
        year: 2022,
        link: 'https://drive.google.com/file/d/1fvAruafhsfEbQr9DYcvoW2Oyi8GguuHu/view'
      },
      {
        id: 2,
        category: 'Data Science',
        name: 'Belajar Analisis Data dengan Python',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/JMZVV1E0RZN9'
      },
      {
        id: 3,
        category: 'Artificial Intelligence',
        name: 'Belajar Dasar AI',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/NVP7Q8NWGZR0'
      },
      {
        id: 4,
        category: 'Data Science',
        name: 'Belajar Machine Learning untuk Pemula',
        issuer: 'Dicoding Indonesia',
        year: 2023,
        link: 'https://www.dicoding.com/certificates/EYX407VQ5PDL'
      },
      {
        id: 5,
        category: 'Data Science',
        name: 'Belajar Pengembangan Machine Learning',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/QLZ94VR9EP5D'
      },
      {
        id: 6,
        category: 'Data Science',
        name: 'Machine learning Developer Boot Camp Lintasarta',
        issuer: 'Lintasarta',
        year: 2024,
        link: 'https://drive.google.com/file/d/1Q6j6HLPv9ND0fwv7l_DkATlw0cHuffW_/edit'
      },
      {
        id: 7,
        category: 'Web Development',
        name: 'Belajar dasar Git dan Github',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/07Z6WDV22ZQR'
      },
      {
        id: 8,
        category: 'Web Development',
        name: 'Belajar dasar pemrograman Javascript ',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/53XEYR4J0PRN'
      },
      {
        id: 9,
        category: 'Web Development',
        name: 'Belajar Membuat aplikasi backend pemula',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/MEPJNJE6QX3V'
      },
      {
        id: 10,
        category: 'Web Development',
        name: 'Belajar Dasar SQL',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/07Z608D62ZQR'
      },
      {
        id: 11,
        category: 'Web Development',
        name: 'Belajar Membuat Front End Web pemula ',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/EYX40W3JWPDL'
      },
      {
        id: 12,
        category: 'Web Development',
        name: 'Belajar fundamental front-end web development',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/MEPJY83KLP3V'
      },
      {
        id: 14,
        category: 'Data Science',
        name: 'Belajar Dasar Data Science',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/0LZ060O73Z65'
      },
      {
        id: 18,
        category: 'Web Development',
        name: 'Mentor Coding Camp',
        issuer: 'Dicoding Indonesia',
        year: 2025,
        link: 'https://drive.google.com/file/d/1SP5XiR70mYTX9sO45DF1Qx3nOvhQlPjj/view?usp=sharing'
      },
      {
        id: 19,
        category: 'Project Management',
        name: 'Belajar Dasar Manajemen Proyek',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/MEPJNJJ7QX3V'
      },
      {
        id: 20,
        category: 'Data Science',
        name: 'Belajar Pemrograman Prosedural dengan Python',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/MEPJNJ3VQX3V'
      },
      {
        id: 21,
        category: 'Artificial Intelligence',
        name: 'Belajar Dasar Cloud dan Gen AI di AWS',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/JLX17WRJ5X72'
      },
      {
        id: 23,
        category: 'Web Development',
        name: 'Lulusan terbaik MSIB Dicoding Cycle 6',
        issuer: 'Dicoding Indonesia',
        year: 2025,
        link: 'https://drive.google.com/file/d/1qgS0JOWzbH--abl_tzy8f1EWFQIIK3Xn/view'
      },
      {
        id: 25,
        category: 'Web Development',
        name: 'Menjadi Front End web development Expert',
        issuer: 'Dicoding Indonesia',
        year: 2024,
        link: 'https://www.dicoding.com/certificates/JMZV39O4JPN9'
      },
      {
        id: 26,
        category: 'Web Development',
        name: 'Belajar Membuat Aplikasi Web dengan React',
        issuer: 'Dicoding Indonesia',
        year: 2025,
        link: 'https://www.dicoding.com/certificates/N9ZO2D1VRPG5'
      },
      {
        id: 27,
        category: 'Web Development',
        name: 'Belajar Fundamental Aplikasi Web dengan React',
        issuer: 'Dicoding Indonesia',
        year: 2025,
        link: 'https://www.dicoding.com/certificates/NVP7JJY3VXR0'
      }
    ]
  });
  console.log('✅ Certifications created:', certifications.count, 'certifications');

  // 7. Create Education
  console.log('\n🎓 Creating education...');
  await prisma.achievement.deleteMany({});
  await prisma.publication.deleteMany({});
  
  const education = await prisma.education.upsert({
    where: { id: 1 },
    update: {
      institution: 'Universitas Trunojoyo Madura',
      degree: 'S1',
      major: 'Sistem Informasi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/UTM_DIKBUDRISTEK.png',
      gpa: 3.90,
      predicate: 'Cumlaude',
      scholarship: 'Kartu Indonesia Pintar Kuliah',
      startDate: '2021',
      endDate: '2025',
      transcriptLink: 'https://drive.google.com/file/d/1X7KPCgzGBQNLJIdO-nNlge-_ziB9AcdV/view'
    },
    create: {
      id: 1,
      institution: 'Universitas Trunojoyo Madura',
      degree: 'S1',
      major: 'Sistem Informasi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/UTM_DIKBUDRISTEK.png',
      gpa: 3.90,
      predicate: 'Cumlaude',
      scholarship: 'Kartu Indonesia Pintar Kuliah',
      startDate: '2021',
      endDate: '2025',
      transcriptLink: 'https://drive.google.com/file/d/1X7KPCgzGBQNLJIdO-nNlge-_ziB9AcdV/view'
    }
  });

  // Create achievements
  await prisma.achievement.createMany({
    data: [
      {
        id: 1,
        educationId: 1,
        description: 'Juara 1 Lomba Tingkat UKM FT-ITC pengembangan aplikasi android Java Smart Finance (2023)',
        link: 'https://docs.google.com/document/d/1VA87aUuj8bQXcZXNQd6oxu5zEBfzSwA_drXI6dGfRik/edit?tab=t.0'
      },
      {
        id: 2,
        educationId: 1,
        description: 'Lulusan terbaik program Magang dan Studi Independen (MSIB) Dicoding Cycle 6 bidang pengembangan Front-End dan Back-End (Januari 2024)',
        link: 'https://drive.google.com/file/d/1qgS0JOWzbH--abl_tzy8f1EWFQIIK3Xn/view'
      },
      {
        id: 3,
        educationId: 1,
        description: 'MBKM Riset [ Berhasil melakukan Riset Inovasi Desain Warna Batik dengan Generative Adversarial Network (GAN): Studi  Integrasi Warna Batik Madura dan Batik Bali (November 2024)',
        link: 'https://drive.google.com/file/d/1SppvJcuVZJD3fzA4dDwiSlyH8qFD_4Uo/view?usp=sharing'
      },
      {
        id: 4,
        educationId: 1,
        description: 'Sebagai ketua tim riset, berhasil lolos Insentif PKM-AI (Artikel Ilmiah) tingkat nasional, dengan riset mengenai [Model Style Transfer Deep Learning] (Juli 2025)',
        link: 'https://drive.google.com/file/d/1BPNjAZetoEyLnxbJcQvu31XiGH-6GyVZ/view?usp=sharing'
      }
    ]
  });

  // Create publications
  await prisma.publication.createMany({
    data: [
      {
        id: 25,
        educationId: 1,
        title: 'The Comparison of GAN and CNN Models in the Innovation of Coloring Madura and Bali Batik',
        authors: 'Yohan Permana S.Kom. | Dr Arik Kurniawati, S.Kom., MT.,| Dr. Fitri Damayanti, S.Kom,| M.Kom , | Dr. I Ketut Adi Purnawan, ST., M.Eng.',
        publisher: 'JAREE (Journal on Advanced Research in Electrical Engineering)',
        indexLevel: 'SINTA 3',
        year: 2025,
        link: 'https://jaree.its.ac.id/index.php/jaree/article/view/467/193#'
      },
      {
        id: 26,
        educationId: 1,
        title: 'Penggunaan Latent Dirichlet Allocation (LDA) dan Support-Vector Machine (SVM) Untuk Menganalisis Sentimen Berdasarkan Aspek Dalam Ulasan Aplikasi EdLink',
        authors: 'Dr. Yeni Kustiyahningsih, S.Kom., M.Kom, | Yohan Permana, S.Kom',
        publisher: 'JURNAL teknika IKADO',
        indexLevel: 'SINTA 3',
        year: 2024,
        link: 'https://ejournal.ikado.ac.id/index.php/teknika/article/view/746/314'
      }
    ]
  });

  console.log('✅ Education created:', education.institution);
  console.log('✅ Achievements created: 4 achievements');
  console.log('✅ Publications created: 2 publications');

  // 8. Create Experience
  console.log('\n💼 Creating experience...');
  await prisma.experience.deleteMany({});

  const experiences = await prisma.experience.createMany({
    data: [
      {
        id: 1,
        company: 'Coding Camp (Dicoding X Dbs Foundation)',
        position: 'Mentor Non-Class Front-End Back-End',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQEONBPsiZnU8w/company-logo_200_200/company-logo_200_200/0/1729482329489?e=2147483647&v=beta&t=dkMktUDkXt7130IuDwAyygkV13ZUc5gnI4JksnlUQ84',
        description: 'Membimbing peserta pada jalur pembelajaran web front-end dan back-end, mendukung penyelesaian modul serta proyek akhir, menilai capstone project melalui presentasi dan peer review, membantu peserta yang mengalami kesulitan belajar melalui program Coding Camp Buddies dan sesi berbagi di Coding Camp Corner, serta berperan sebagai moderator dan anotator dalam sesi ILT (Instructor-Led Training) yang mencakup materi teknis maupun soft skills.',
        startDate: 'February 2025',
        endDate: 'July 2025'
      },
      {
        id: 2,
        company: 'Dicoding Indonesia',
        position: 'Student MSIB Front-End Back-End',
        logo: 'https://secure.gravatar.com/avatar/5b745c00e4c4fa6f096af5e7b9d708522438c144192f9b5ea89da43a29d5ce63?s=500&d=blank&r=g',
        description: 'Lulusan Terbaik program Studi Independen Dicoding Batch 6 dalam inisiatif MBKM MSIB berfokus pada pengembangan web front-end dan back-end. Kegiatan ini membekali peserta dengan keterampilan industri di bidang full-stack web development melalui pembelajaran logika pemrograman, Git & GitHub, HTML, CSS, JavaScript, Node.js, serta pembuatan proyek web end-to-end. Selain itu, program ini juga mencakup pengembangan soft skills seperti komunikasi, presentasi, dan persiapan karier profesional.',
        startDate: 'February 2024',
        endDate: 'June 2024'
      },
      {
        id: 3,
        company: 'PT Inosoft Trans Sistem',
        position: 'Web Development Front-End Intern',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQFTPNPoKrjU-g/company-logo_200_200/company-logo_200_200/0/1737529613391/inosoftweb_logo?e=2147483647&v=beta&t=FMUq1PCiparXJS1WUVhrxSKNB9dKOU4BUDK6PsXHfQw',
        description: 'Membantu mengembangkan website untuk Virtuse dengan menggunakan framework CodeIgniter 4, menerapkan Tailwind CSS, serta mengelola basis data menggunakan SQL. Selain itu, berkontribusi dalam pengembangan e-commerce Mayred berbasis PrestaShop dengan berkolaborasi bersama tim dan melakukan improvisasi seperti modifikasi HTML untuk fitur tertentu.',
        startDate: 'January 2024',
        endDate: 'February 2024'
      }
    ]
  });
  console.log('✅ Experiences created:', experiences.count, 'experiences');

  // 9. Create Activities (dummy data)
  console.log('\n🗓️ Creating activities...');
  await prisma.activity.deleteMany({});

  await prisma.activity.create({
    data: {
      id: 1,
      title: 'React Workshop',
      description: 'Hands-on session building modern UIs with React and best practices.',
      images: {
        create: [
          { imageUrl: 'https://via.placeholder.com/1200x600?text=React+Workshop+1' },
          { imageUrl: 'https://via.placeholder.com/1200x600?text=React+Workshop+2' },
        ],
      },
    },
  });

  await prisma.activity.create({
    data: {
      id: 2,
      title: 'Open Source Contribution',
      description: 'Contributed to community projects and improved features & documentation.',
      images: {
        create: [
          { imageUrl: 'https://via.placeholder.com/1200x600?text=Open+Source+1' },
          { imageUrl: 'https://via.placeholder.com/1200x600?text=Open+Source+2' },
        ],
      },
    },
  });

  await prisma.activity.create({
    data: {
      id: 3,
      title: 'Tech Talk: Next.js Performance',
      description: 'Presented optimization techniques for faster React/Next.js applications.',
      images: {
        create: [
          { imageUrl: 'https://via.placeholder.com/1200x600?text=Next.js+Performance+1' },
          { imageUrl: 'https://via.placeholder.com/1200x600?text=Next.js+Performance+2' },
        ],
      },
    },
  });
  console.log('✅ Activities created');

  // 10. Create User (for authentication)
  console.log('\n👤 Creating user...');
  const bcrypt = require('bcrypt');
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin123', salt);

  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: { role: 'admin' },
    create: {
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    }
  });
  console.log('✅ User created:', user.username);
  console.log('   Username: admin');
  console.log('   Password: admin123 (change this!)');

  // 10. Create Demo User (read-only)
  console.log('\n👤 Creating demo user (read-only)...');
  const demoHashedPassword = await bcrypt.hash('demo123', salt);
  const demoUser = await prisma.user.upsert({
    where: { username: 'demo' },
    update: { role: 'demo' },
    create: {
      username: 'demo',
      password: demoHashedPassword,
      role: 'demo'
    }
  });
  console.log('✅ Demo user created:', demoUser.username);
  console.log('   Username: demo');
  console.log('   Password: demo123');
  console.log('   Permissions: READ ONLY (cannot create, update, or delete)');

  console.log('\n✨ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
