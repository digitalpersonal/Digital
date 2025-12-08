import { ClassSession, Assessment, Post, Payment, User, Anamnesis, Route, Challenge, PersonalizedWorkout } from '../types';

// Helper para formatar data DD/MM/YYYY
const formatDateStr = (date: Date) => date.toISOString().split('T')[0].split('-').reverse().join('/');

// Gera uma data de nascimento aleatória
const getRandomBirthDate = (age: number) => {
    const year = new Date().getFullYear() - age;
    return `${year}-05-20`;
};

/* -------------------------------------------------------------------------- */
/*                                  USUÁRIOS                                  */
/* -------------------------------------------------------------------------- */

let students: User[] = [
    { 
      id: 'student-1', 
      name: 'Ana Souza', 
      email: 'ana@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-01-01', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Ana+Souza&background=random', 
      phoneNumber: '5511999999999', 
      birthDate: '1995-05-20',
      address: 'Av. Paulista, 1500 - Ap 42 - Bela Vista, São Paulo - SP',
      contractUrl: 'mock_contract_string' // Simula contrato assinado
    },
    { 
      id: 'student-2', 
      name: 'Carlos Oliveira', 
      email: 'carlos@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-02-15', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Carlos+Oliveira&background=random', 
      phoneNumber: '5511988888888', 
      birthDate: '1990-11-10',
      address: 'Rua Augusta, 500 - Consolação, São Paulo - SP' 
    },
    { 
      id: 'student-3', 
      name: 'João Silva', 
      email: 'joao@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-03-10', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Joao+Silva', 
      phoneNumber: '5511977777777', 
      birthDate: getRandomBirthDate(25), // 25 anos
      address: 'Rua Oscar Freire, 100 - Jardins, São Paulo - SP' 
    }, 
    // NOVOS ALUNOS
    { 
      id: 'student-4', 
      name: 'Juliana Martins', 
      email: 'juliana@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-05-20', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Juliana+Martins&background=f472b6&color=fff', 
      phoneNumber: '5511966666666', 
      birthDate: getRandomBirthDate(32),
      address: 'Rua dos Pinheiros, 700 - Pinheiros, São Paulo - SP' 
    },
    { 
      id: 'student-5', 
      name: 'Roberto Almeida', 
      email: 'roberto@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-06-01', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Roberto+Almeida&background=3b82f6&color=fff', 
      phoneNumber: '5511955555555', 
      birthDate: getRandomBirthDate(65),
      address: 'Av. Brigadeiro Faria Lima, 2000 - Itaim, São Paulo - SP',
      anamnesis: {
          hasInjury: false, hasHeartCondition: true, 
          notes: 'Monitorar frequência cardíaca', emergencyContactName: 'Maria', emergencyContactPhone: '1199999999',
          hadSurgery: false, takesMedication: true, medicationDescription: 'Pressão alta',
          updatedAt: '2023-06-01'
      }
    },
    { 
      id: 'student-6', 
      name: 'Fernanda Costa', 
      email: 'fernanda@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-07-15', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Fernanda+Costa&background=10b981&color=fff', 
      phoneNumber: '5511944444444', 
      birthDate: getRandomBirthDate(22),
      address: 'Rua da Consolação, 1200 - Centro, São Paulo - SP' 
    },
    { 
      id: 'student-7', 
      name: 'Lucas Pereira', 
      email: 'lucas@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-08-10', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Lucas+Pereira&background=f59e0b&color=fff', 
      phoneNumber: '5511933333333', 
      birthDate: getRandomBirthDate(28),
      address: 'Rua Haddock Lobo, 400 - Cerqueira César, São Paulo - SP' 
    },
    { 
      id: 'student-8', 
      name: 'Mariana Santos', 
      email: 'mariana@teste.com', 
      role: 'STUDENT' as any, 
      joinDate: '2023-09-05', 
      avatarUrl: 'https://ui-avatars.com/api/?name=Mariana+Santos&background=8b5cf6&color=fff', 
      phoneNumber: '5511922222222', 
      birthDate: getRandomBirthDate(29),
      address: 'Alameda Lorena, 800 - Jardins, São Paulo - SP' 
    }
];

/* -------------------------------------------------------------------------- */
/*                                    AULAS                                   */
/* -------------------------------------------------------------------------- */

let classes: ClassSession[] = [
  {
    id: 'c1',
    title: 'Desafio Matinal',
    description: 'Circuito funcional de alta intensidade.',
    dayOfWeek: 'Segunda',
    startTime: '06:00',
    durationMinutes: 60,
    instructor: 'Treinador Alexandre',
    maxCapacity: 15,
    enrolledStudentIds: ['student-1', 'student-2', 'student-4', 'student-7'], // Mais alunos
    waitlistStudentIds: [],
    type: 'FUNCTIONAL',
    wod: "**Aquecimento (10')**\n- 5min Trote Leve\n- Mobilidade de Quadril\n\n**Parte Principal (40')**\nAMRAP 20':\n- 10 Burpees\n- 15 Kettlebell Swings\n- 20 Box Jumps\n\n**Volta à Calma (10')**\n- Alongamento Estático",
    feedback: [{ studentId: 'student-2', rating: 8 }]
  },
  {
    id: 'c2',
    title: 'Sunset Run',
    description: 'Ritmo de 5k e intervalados.',
    dayOfWeek: 'Quarta',
    startTime: '18:30',
    durationMinutes: 75,
    instructor: 'Treinadora Beatriz',
    maxCapacity: 20,
    enrolledStudentIds: ['student-1', 'student-4', 'student-6'], // Corredores
    waitlistStudentIds: [],
    type: 'RUNNING',
    wod: "**Aquecimento**\n- 2km Trote progressivo\n\n**Principal**\n- 6x 400m forte (Pace 4:00) com 2' descanso\n\n**Desaquecimento**\n- 1km Caminhada",
    feedback: []
  },
  {
    id: 'c3',
    title: 'Força Pura',
    description: 'Levantamento de peso e técnica.',
    dayOfWeek: 'Sexta',
    startTime: '19:00',
    durationMinutes: 60,
    instructor: 'Treinador Alexandre',
    maxCapacity: 12,
    enrolledStudentIds: ['student-2', 'student-7', 'student-5'], // Pessoal da força e o Roberto
    waitlistStudentIds: ['student-8'], // Mariana na espera
    type: 'FUNCTIONAL',
    wod: "Foco: Deadlift\n\n5 séries de 5 repetições com 80% do RM.\nDescanso de 3 min entre séries.",
    feedback: [{ studentId: 'student-2', rating: 9 }, { studentId: 'student-7', rating: 10 }]
  }
];

/* -------------------------------------------------------------------------- */
/*                                  TREINOS                                   */
/* -------------------------------------------------------------------------- */

let personalizedWorkouts: PersonalizedWorkout[] = [
    {
        id: 'pw1',
        title: 'Treino de Viagem - Hotel',
        description: "**Aquecimento:**\n30 Polichinelos\n20 Agachamentos Livres\n\n**Circuito (4 Rounds):**\n- 15 Flexões de Braço (Apoio no sofá se precisar)\n- 20 Afundos (cada perna)\n- 30seg Prancha Abdominal\n- 15 Tríceps no Banco/Cadeira\n\n**Descanso:** 1min entre rounds.",
        videoUrl: 'https://youtube.com/shorts/example',
        studentIds: ['student-1', 'student-4'],
        createdAt: '2024-05-10',
        instructorName: 'Treinador Alexandre'
    },
    {
        id: 'pw2',
        title: 'Fortalecimento de Core (Extra)',
        description: "Realizar 3x na semana após a corrida:\n\n- 3x 15 Abdominal Remador\n- 3x 40seg Prancha Lateral (cada lado)\n- 3x 15 Elevação de Perna\n- 3x 12 Perdigueiro (cada lado)",
        studentIds: ['student-1', 'student-2', 'student-7'],
        createdAt: '2024-05-12',
        instructorName: 'Treinadora Beatriz'
    },
    {
        id: 'pw3',
        title: 'Adaptação Idoso - Casa',
        description: "Fazer com calma e foco na postura.\n\n- Sentar e levantar da cadeira (3x 10)\n- Elevação lateral com garrafa d'água (3x 12)\n- Panturrilha em pé segurando na parede (3x 15)",
        studentIds: ['student-5'],
        createdAt: '2024-06-05',
        instructorName: 'Treinador Alexandre'
    }
];

/* -------------------------------------------------------------------------- */
/*                                AVALIAÇÕES                                  */
/* -------------------------------------------------------------------------- */

let assessments: Assessment[] = [
  // ANA SOUZA
  {
    id: 'a1',
    studentId: 'student-1',
    date: '2024-01-15',
    status: 'DONE',
    notes: 'Boa base inicial. Focar na resistência.',
    weight: 65,
    height: 168,
    bodyFatPercentage: 22,
    skeletalMuscleMass: 28,
    visceralFatLevel: 5,
    basalMetabolicRate: 1450,
    hydrationPercentage: 55,
    vo2Max: 45,
    squatMax: 80,
    circumferences: {
        chest: 90, waist: 72, abdomen: 78, hips: 98, 
        rightArmRelaxed: 28, rightThigh: 56, rightCalf: 36
    },
    skinfolds: {
        triceps: 15, suprailiac: 18, abdominal: 20, thigh: 22
    },
    customMetrics: [{ name: 'Flexões', value: '20', unit: 'reps' }]
  },
  {
    id: 'a2',
    studentId: 'student-1',
    date: '2024-02-15',
    status: 'DONE',
    notes: 'Ótimo progresso no VO2 Max.',
    weight: 64,
    height: 168,
    bodyFatPercentage: 21,
    skeletalMuscleMass: 28.5,
    visceralFatLevel: 4,
    basalMetabolicRate: 1460,
    hydrationPercentage: 56,
    vo2Max: 47,
    squatMax: 85,
    circumferences: {
        chest: 90, waist: 71, abdomen: 76, hips: 97, 
        rightArmRelaxed: 28.5, rightThigh: 56, rightCalf: 36
    },
    customMetrics: [{ name: 'Flexões', value: '25', unit: 'reps' }]
  },
  
  // LUCAS PEREIRA (Focado em força)
  {
    id: 'a5',
    studentId: 'student-7',
    date: '2024-08-15',
    status: 'DONE',
    notes: 'Excelente massa muscular. Melhorar mobilidade de ombro.',
    weight: 85,
    height: 180,
    bodyFatPercentage: 12,
    skeletalMuscleMass: 42,
    visceralFatLevel: 3,
    basalMetabolicRate: 1950,
    hydrationPercentage: 60,
    vo2Max: 42,
    squatMax: 140,
    circumferences: {
        chest: 110, waist: 82, abdomen: 84, hips: 100, 
        rightArmContracted: 42, rightThigh: 62, rightCalf: 40
    }
  },

  // JULIANA MARTINS (Corredora)
  {
    id: 'a6',
    studentId: 'student-4',
    date: '2024-06-20',
    status: 'DONE',
    notes: 'VO2 Max excelente. Fortalecer glúteo médio.',
    weight: 58,
    height: 165,
    bodyFatPercentage: 18,
    skeletalMuscleMass: 24,
    visceralFatLevel: 2,
    basalMetabolicRate: 1350,
    hydrationPercentage: 58,
    vo2Max: 52,
    squatMax: 60,
  }
];

// Mock de Presenças (Attendance)
let attendanceHistory: {[classId: string]: string[]} = {
    'c1': ['student-1', 'student-2', 'student-7'],
    'c2': ['student-1', 'student-4']
}; 

/* -------------------------------------------------------------------------- */
/*                                    POSTS                                   */
/* -------------------------------------------------------------------------- */

let posts: Post[] = [
  {
    id: 'p1',
    userId: 'student-1',
    userName: 'Ana Souza',
    userAvatar: 'https://ui-avatars.com/api/?name=Ana+Souza&background=random',
    imageUrl: 'https://picsum.photos/id/73/600/400',
    caption: 'Destruí nos 10k hoje! 🏃‍♀️🔥',
    likes: 12,
    timestamp: '2 horas atrás'
  },
  {
    id: 'p2',
    userId: 'student-2',
    userName: 'Carlos Oliveira',
    userAvatar: 'https://ui-avatars.com/api/?name=Carlos+Oliveira&background=random',
    imageUrl: 'https://picsum.photos/id/96/600/400',
    caption: 'Novo recorde no terra. 140kg! 💪',
    likes: 24,
    timestamp: '5 horas atrás'
  },
  {
    id: 'p3',
    userId: 'student-4',
    userName: 'Juliana Martins',
    userAvatar: 'https://ui-avatars.com/api/?name=Juliana+Martins&background=f472b6&color=fff',
    imageUrl: 'https://picsum.photos/id/129/600/400',
    caption: 'Domingo é dia de longão no parque. Paz! 🌳☀️',
    likes: 35,
    timestamp: '1 dia atrás'
  }
];

/* -------------------------------------------------------------------------- */
/*                                 FINANCEIRO                                 */
/* -------------------------------------------------------------------------- */

// Helper para gerar plano anual automático
const generateYearlyPlan = (studentId: string, startDateStr: string) => {
    const newPayments: Payment[] = [];
    const [year, month, day] = startDateStr.split('-').map(Number);
    const amount = 150.00;

    for (let i = 0; i < 12; i++) {
        const dueDate = new Date(year, month - 1 + i, 5); // Vence dia 05
        const today = new Date();
        today.setHours(0,0,0,0);
        
        let status: 'PAID' | 'PENDING' | 'OVERDUE' = 'PENDING';
        
        if (dueDate < today) {
            // Se venceu há mais de 5 dias e não pagou, atrasado. 
            // Senão, vamos simular alguns pagos e outros atrasados aleatoriamente
            if (Math.random() > 0.3) status = 'PAID'; 
            else status = 'OVERDUE';
        }

        newPayments.push({
            id: `pay_${studentId}_${i}`,
            studentId,
            amount,
            status: status,
            dueDate: formatDateStr(dueDate),
            description: `Mensalidade ${i+1}/12`,
            installmentNumber: i + 1,
            totalInstallments: 12
        });
    }
    return newPayments;
};

// Gera pagamentos para TODOS os alunos automaticamente
let payments: Payment[] = [];
students.forEach(student => {
    const studentPayments = generateYearlyPlan(student.id, student.joinDate);
    payments = [...payments, ...studentPayments];
});

// Força alguns pagamentos específicos para demonstração de alertas
const student1Late = payments.find(p => p.studentId === 'student-1' && p.status === 'PAID');
if (student1Late) {
    // Transforma um pago em atrasado para demonstração
    student1Late.status = 'OVERDUE';
    student1Late.description = "Mensalidade Pendente (Demo)";
}

/* -------------------------------------------------------------------------- */
/*                                   OUTROS                                   */
/* -------------------------------------------------------------------------- */

let routes: Route[] = [
  {
    id: 'r1',
    title: 'Volta do Lago',
    distanceKm: 5.2,
    description: 'Percurso plano ideal para iniciantes em volta do lago principal.',
    mapLink: 'https://maps.google.com',
    difficulty: 'EASY',
    elevationGain: 10
  },
  {
    id: 'r2',
    title: 'Desafio da Colina',
    distanceKm: 8.5,
    description: 'Treino de força com subidas íngremes.',
    mapLink: 'https://maps.google.com',
    difficulty: 'HARD',
    elevationGain: 150
  },
  {
    id: 'r3',
    title: 'Trilha da Mata',
    distanceKm: 12.0,
    description: 'Percurso misto com trechos de terra e asfalto.',
    mapLink: 'https://maps.google.com',
    difficulty: 'MEDIUM',
    elevationGain: 80
  }
];

let globalChallenge: Challenge = {
  id: 'ch1',
  title: 'Volta ao Mundo',
  description: 'Acumular 40.000km corridos somando todos os alunos da academia.',
  targetValue: 40000,
  unit: 'km',
  startDate: '2024-01-01',
  endDate: '2024-12-31'
};

/* -------------------------------------------------------------------------- */
/*                                  SERVICE                                   */
/* -------------------------------------------------------------------------- */

export const MockService = {
  getClasses: () => Promise.resolve(classes),
  
  addClass: (newClass: Omit<ClassSession, 'id'>) => {
    const newItem = { 
        ...newClass, 
        id: Math.random().toString(36).substr(2, 9), 
        enrolledStudentIds: [],
        waitlistStudentIds: [] // Init empty waitlist
    };
    classes = [...classes, newItem];
    return Promise.resolve(newItem);
  },
  
  updateClass: (updatedClass: ClassSession) => {
    classes = classes.map(c => c.id === updatedClass.id ? updatedClass : c);
    return Promise.resolve(updatedClass);
  },

  deleteClass: (id: string) => {
    classes = classes.filter(c => c.id !== id);
    return Promise.resolve(true);
  },

  enrollStudent: (classId: string, studentId: string) => {
    classes = classes.map(c => {
      if (c.id === classId && !c.enrolledStudentIds.includes(studentId)) {
        // Se a classe estiver lotada e o aluno não estiver inscrito, erro ou lista de espera (tratado no front)
        if (c.enrolledStudentIds.length >= c.maxCapacity) {
             return c;
        }
        return { ...c, enrolledStudentIds: [...c.enrolledStudentIds, studentId] };
      }
      return c;
    });
    return Promise.resolve(true);
  },
  
  removeStudentFromClass: (classId: string, studentId: string) => {
    let promotedStudent: string | null = null;

    classes = classes.map(c => {
      if (c.id === classId) {
        // Remove student
        const newEnrolled = c.enrolledStudentIds.filter(id => id !== studentId);
        
        // Verifica lista de espera
        let newWaitlist = [...(c.waitlistStudentIds || [])];
        if (newWaitlist.length > 0 && newEnrolled.length < c.maxCapacity) {
            // Promove o primeiro da lista
            promotedStudent = newWaitlist[0];
            newEnrolled.push(promotedStudent); // Adiciona aos inscritos
            newWaitlist.shift(); // Remove da espera
        }

        return { 
            ...c, 
            enrolledStudentIds: newEnrolled,
            waitlistStudentIds: newWaitlist
        };
      }
      return c;
    });
    
    // Em um app real, aqui enviariamos email/push para promotedStudent
    return Promise.resolve({ success: true, promotedStudentId: promotedStudent });
  },

  // Waitlist Logic
  joinWaitlist: (classId: string, studentId: string) => {
      classes = classes.map(c => {
          if (c.id === classId && !c.waitlistStudentIds?.includes(studentId)) {
               return { ...c, waitlistStudentIds: [...(c.waitlistStudentIds || []), studentId] };
          }
          return c;
      });
      return Promise.resolve(true);
  },

  leaveWaitlist: (classId: string, studentId: string) => {
      classes = classes.map(c => {
          if (c.id === classId) {
               return { ...c, waitlistStudentIds: (c.waitlistStudentIds || []).filter(id => id !== studentId) };
          }
          return c;
      });
      return Promise.resolve(true);
  },

  // Attendance Logic
  saveAttendance: (classId: string, presentStudentIds: string[]) => {
      attendanceHistory[classId] = presentStudentIds;
      return Promise.resolve(true);
  },

  // PSE/Feedback Logic
  rateClass: (classId: string, studentId: string, rating: number) => {
      classes = classes.map(c => {
          if (c.id === classId) {
              const currentFeedback = c.feedback || [];
              const existingIndex = currentFeedback.findIndex(f => f.studentId === studentId);
              
              let newFeedback;
              if (existingIndex >= 0) {
                  // Update existing
                  newFeedback = [...currentFeedback];
                  newFeedback[existingIndex].rating = rating;
              } else {
                  // Add new
                  newFeedback = [...currentFeedback, { studentId, rating }];
              }
              return { ...c, feedback: newFeedback };
          }
          return c;
      });
      return Promise.resolve(true);
  },

  getStudentAttendanceStats: (studentId: string) => {
      let totalClasses = 0;
      let presentCount = 0;

      classes.forEach(cls => {
         if (cls.enrolledStudentIds.includes(studentId)) {
             totalClasses++;
             if (attendanceHistory[cls.id] && attendanceHistory[cls.id].includes(studentId)) {
                 presentCount++;
             } else if (!attendanceHistory[cls.id]) {
                 // Assume presente se não houve chamada ainda? Ou ausente?
                 // Vamos assumir que se não houve chamada, não conta, ou conta como presente para stats iniciais
                 presentCount++; 
             }
         }
      });
      
      const percentage = totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 100;
      return Promise.resolve({ percentage, totalClasses, presentCount });
  },
  
  getAssessments: (studentId?: string) => {
    if (studentId) return Promise.resolve(assessments.filter(a => a.studentId === studentId));
    return Promise.resolve(assessments);
  },
  
  addAssessment: (newAssessment: Omit<Assessment, 'id'>) => {
    const newItem = { ...newAssessment, id: Math.random().toString(36).substr(2, 9) };
    assessments = [...assessments, newItem];
    return Promise.resolve(newItem);
  },

  updateAssessment: (updatedAssessment: Assessment) => {
    assessments = assessments.map(a => a.id === updatedAssessment.id ? updatedAssessment : a);
    return Promise.resolve(updatedAssessment);
  },

  deleteAssessment: (id: string) => {
    assessments = assessments.filter(a => a.id !== id);
    return Promise.resolve(true);
  },

  getPosts: () => Promise.resolve(posts),
  addPost: (newPost: Post) => {
    posts = [newPost, ...posts];
    return Promise.resolve(newPost);
  },

  getPayments: (studentId?: string) => {
    if (studentId) return Promise.resolve(payments.filter(p => p.studentId === studentId));
    return Promise.resolve(payments);
  },

  getAllStudents: () => Promise.resolve(students),
  
  addStudent: (student: Omit<User, 'id'>) => {
      const newId = Math.random().toString(36).substr(2, 9);
      const newStudent = { ...student, id: newId } as User;
      students = [...students, newStudent];

      // Gera financeiro automaticamente
      const newPlan = generateYearlyPlan(newId, student.joinDate);
      payments = [...payments, ...newPlan];

      return Promise.resolve(newStudent);
  },

  updateStudent: (updatedStudent: User) => {
      students = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
      return Promise.resolve(updatedStudent);
  },

  deleteStudent: (id: string) => {
      students = students.filter(s => s.id !== id);
      return Promise.resolve(true);
  },

  // Save Anamnesis
  saveAnamnesis: (userId: string, anamnesis: Anamnesis) => {
      students = students.map(s => s.id === userId ? { ...s, anamnesis: anamnesis } : s);
      return Promise.resolve(true);
  },

  // Mark Payment as Paid (Manual)
  markPaymentAsPaid: (id: string) => {
    payments = payments.map(p => p.id === id ? { ...p, status: 'PAID' } : p);
    return Promise.resolve(true);
  },

  // Retorna pagamentos vencidos ou prestes a vencer (5 dias) PARA O ADMIN
  getPaymentAlerts: () => {
    const alerts: { payment: Payment, student: User, type: 'OVERDUE' | 'TODAY' | 'UPCOMING', daysDiff: number }[] = [];
    const today = new Date();
    // Zerar horas para comparar apenas datas
    today.setHours(0,0,0,0);

    payments.forEach(p => {
        const student = students.find(s => s.id === p.studentId);
        if (!student) return;

        // Parse DD/MM/YYYY to Date object
        const [day, month, year] = p.dueDate.split('/').map(Number);
        const due = new Date(year, month - 1, day);
        due.setHours(0,0,0,0);
        
        // Diferença em dias
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (p.status === 'OVERDUE') {
            alerts.push({ payment: p, student, type: 'OVERDUE', daysDiff: Math.abs(diffDays) });
        } else if (p.status === 'PENDING') {
            if (diffDays === 0) {
                 alerts.push({ payment: p, student, type: 'TODAY', daysDiff: 0 });
            } else if (diffDays > 0 && diffDays <= 5) {
                alerts.push({ payment: p, student, type: 'UPCOMING', daysDiff: diffDays });
            }
        }
    });

    // Ordenação: Vencidos -> Hoje -> Próximos
    return Promise.resolve(alerts.sort((a, b) => {
        const priority = { 'OVERDUE': 1, 'TODAY': 2, 'UPCOMING': 3 };
        if (priority[a.type] !== priority[b.type]) {
            return priority[a.type] - priority[b.type];
        }
        return a.daysDiff - b.daysDiff;
    }));
  },

  // Retorna a lista para o Dashboard do ALUNO
  getStudentPendingPayments: (studentId: string) => {
      const pending: { payment: Payment, type: 'OVERDUE' | 'TODAY' | 'UPCOMING', daysDiff: number }[] = [];
      const today = new Date();
      today.setHours(0,0,0,0);

      payments.filter(p => p.studentId === studentId).forEach(p => {
         const [day, month, year] = p.dueDate.split('/').map(Number);
         const due = new Date(year, month - 1, day);
         due.setHours(0,0,0,0);
         const diffTime = due.getTime() - today.getTime();
         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

         if (p.status === 'OVERDUE') {
             pending.push({ payment: p, type: 'OVERDUE', daysDiff: Math.abs(diffDays) });
         } else if (p.status === 'PENDING') {
             if (diffDays === 0) {
                 pending.push({ payment: p, type: 'TODAY', daysDiff: 0 });
             } else if (diffDays > 0 && diffDays <= 5) {
                 pending.push({ payment: p, type: 'UPCOMING', daysDiff: diffDays });
             }
         }
      });
      
      // Ordenação: Vencidos -> Hoje -> Próximos
      return Promise.resolve(pending.sort((a, b) => {
          const priority = { 'OVERDUE': 1, 'TODAY': 2, 'UPCOMING': 3 };
          return priority[a.type] - priority[b.type];
      }));
  },

  // Retorna aniversariantes do dia
  getBirthdays: () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // JS months are 0-indexed
    const currentDay = today.getDate();

    const matches = students.filter(s => {
        if (!s.birthDate) return false;
        const [year, month, day] = s.birthDate.split('-').map(Number);
        return month === currentMonth && day === currentDay;
    });

    return Promise.resolve(matches);
  },

  getFinancialReport: (year: number) => {
    const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    // Inicializa estrutura de 12 meses
    const monthlyData = monthNames.map(name => ({ name, students: 0, revenue: 0 }));

    payments.forEach(p => {
       // Considerar apenas pagos
       if (p.status !== 'PAID') return;

       const [day, month, y] = p.dueDate.split('/').map(Number);
       
       if (y === year) {
           const idx = month - 1;
           if (idx >= 0 && idx < 12) {
               monthlyData[idx].revenue += p.amount;
               // Opcional: contar alunos únicos pagantes
               monthlyData[idx].students += 1; 
           }
       }
    });

    return Promise.resolve(monthlyData);
  },

  getReportData: (range: 'week' | 'month' | 'year') => {
    if (range === 'week') {
      return Promise.resolve([
        { name: 'Seg', students: 12, revenue: 1200 },
        { name: 'Ter', students: 19, revenue: 1900 },
        { name: 'Qua', students: 15, revenue: 1500 },
        { name: 'Qui', students: 22, revenue: 2200 },
        { name: 'Sex', students: 18, revenue: 1800 },
        { name: 'Sab', students: 25, revenue: 2500 },
        { name: 'Dom', students: 10, revenue: 1000 },
      ]);
    } else if (range === 'month') {
      return Promise.resolve([
        { name: 'Sem 1', students: 80, revenue: 8000 },
        { name: 'Sem 2', students: 95, revenue: 9500 },
        { name: 'Sem 3', students: 88, revenue: 8800 },
        { name: 'Sem 4', students: 102, revenue: 10200 },
      ]);
    } else {
        // Fallback genérico para anos anteriores, caso não use o getFinancialReport
      return Promise.resolve([
        { name: 'Jan', students: 300, revenue: 30000 },
        { name: 'Fev', students: 320, revenue: 32000 },
        { name: 'Mar', students: 350, revenue: 35000 },
        { name: 'Abr', students: 340, revenue: 34000 },
        { name: 'Mai', students: 380, revenue: 38000 },
        { name: 'Jun', students: 400, revenue: 40000 },
      ]);
    }
  },

  getRoutes: () => Promise.resolve(routes),
  
  addRoute: (newRoute: Route) => {
    const r = { ...newRoute, id: Math.random().toString(36).substr(2, 9) };
    routes = [...routes, r];
    return Promise.resolve(r);
  },

  updateRoute: (updatedRoute: Route) => {
      routes = routes.map(r => r.id === updatedRoute.id ? updatedRoute : r);
      return Promise.resolve(updatedRoute);
  },

  deleteRoute: (id: string) => {
      routes = routes.filter(r => r.id !== id);
      return Promise.resolve(true);
  },

  getGlobalChallengeProgress: () => {
    const totalDistance = 12500; // Mock de progresso coletivo
    return Promise.resolve({ challenge: globalChallenge, totalDistance });
  },

  // PERSONALIZED WORKOUTS
  getPersonalizedWorkouts: (studentId?: string) => {
      if (studentId) {
          return Promise.resolve(personalizedWorkouts.filter(w => w.studentIds.includes(studentId)));
      }
      return Promise.resolve(personalizedWorkouts); // Admin vê todos
  },

  addPersonalizedWorkout: (workout: Omit<PersonalizedWorkout, 'id'>) => {
      const newItem = { ...workout, id: Math.random().toString(36).substr(2, 9) };
      personalizedWorkouts = [...personalizedWorkouts, newItem];
      return Promise.resolve(newItem);
  },

  updatePersonalizedWorkout: (updatedWorkout: PersonalizedWorkout) => {
      personalizedWorkouts = personalizedWorkouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w);
      return Promise.resolve(updatedWorkout);
  },

  deletePersonalizedWorkout: (id: string) => {
      personalizedWorkouts = personalizedWorkouts.filter(w => w.id !== id);
      return Promise.resolve(true);
  }
};