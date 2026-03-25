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
      where: { name: 'JavaScript' },
      update: {},
      create: { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'React' },
      update: {},
      create: { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'Node.js' },
      update: {},
      create: { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'PostgreSQL' },
      update: {},
      create: { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' }
    }),
    prisma.technology.upsert({
      where: { name: 'TypeScript' },
      update: {},
      create: { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' }
    })
  ]);
  console.log('✅ Technologies created:', technologies.map(t => t.name).join(', '));

  // 5. Create Projects
  console.log('\n🎨 Creating projects...');
  const project = await prisma.project.create({
    data: {
      title: 'Portfolio Website',
      description: 'Personal portfolio website built with Next.js and Prisma',
      githubLink: 'https://github.com/example/portfolio',
      demoLink: 'https://portfolio-example.com',
      isFeatured: true,
      images: {
        create: [
          { imageUrl: 'https://via.placeholder.com/800x600' },
          { imageUrl: 'https://via.placeholder.com/800x600' }
        ]
      },
      technologies: {
        create: [
          { technologyId: technologies[1].id }, // React
          { technologyId: technologies[0].id }  // JavaScript
        ]
      }
    },
    include: { images: true, technologies: { include: { technology: true } } }
  });
  console.log('✅ Project created:', project.title);

  // 6. Create Certifications
  console.log('\n🏆 Creating certifications...');
  const cert = await prisma.certification.create({
    data: {
      category: 'Web Development',
      name: 'Full Stack Developer Certification',
      issuer: 'Codecademy',
      year: 2023,
      link: 'https://codecademy.com'
    }
  });
  console.log('✅ Certification created:', cert.name);

  // 7. Create Education
  console.log('\n🎓 Creating education...');
  const education = await prisma.education.create({
    data: {
      institution: 'University of Example',
      degree: 'Bachelor',
      major: 'Computer Science',
      logo: 'https://via.placeholder.com/100',
      gpa: 3.8,
      predicate: 'Cum Laude',
      scholarship: 'Merit Based',
      startDate: 'January 2019',
      endDate: 'December 2023',
      transcriptLink: 'https://example.com/transcript',
      achievements: {
        create: [
          { description: 'Dean\'s List', link: 'https://example.com' },
          { description: 'Best Project Award', link: 'https://example.com' }
        ]
      },
      publications: {
        create: [
          {
            title: 'Machine Learning in Web Development',
            authors: 'Yohan Permana',
            publisher: 'Tech Journal',
            indexLevel: 'Scopus',
            year: 2023,
            link: 'https://example.com'
          }
        ]
      }
    },
    include: { achievements: true, publications: true }
  });
  console.log('✅ Education created:', education.institution);

  // 8. Create Experience
  console.log('\n💼 Creating experience...');
  const experience = await prisma.experience.create({
    data: {
      company: 'Tech Startup Inc',
      position: 'Full Stack Developer',
      logo: 'https://via.placeholder.com/100',
      description: 'Built and maintained web applications using React and Node.js',
      startDate: 'January 2023',
      endDate: 'Present',
      relatedCertificationId: cert.id
    }
  });
  console.log('✅ Experience created:', experience.position);

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
