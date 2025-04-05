export type MajorCategory = '理学' | '工学' | '文学' | '经济学' | '管理学' | '法学' | '医学' | '教育学' | '艺术学' | '农学' | '历史学';

export interface Employment {
  industry: string;
  positions: string[];
  prospectRating: 1 | 2 | 3 | 4 | 5; // 就业前景评分，1-5星
  averageSalary: string; // 平均薪资范围
}

export interface University {
  name: string;
  ranking?: number; // 该专业的全国排名
  admissionScore?: number; // 录取分数线
  location: string;
}

export interface Major {
  id: string;
  name: string;
  slug: string;
  category: MajorCategory;
  code?: string; // 专业代码
  description: string;
  suitable: string; // 适合什么样的学生
  courses: string[]; // 主要课程
  skills: string[]; // 核心能力
  degreeYears: number; // 学制年限
  employment: Employment; // 就业方向
  topUniversities: University[]; // 知名院校
  relatedMajors: string[]; // 相关专业
  featured?: boolean; // 是否为热门专业，用于首页展示
  requiresExam?: boolean; // 是否需要参加校考
}

// 专业数据
export const allMajors: Major[] = [
  {
    id: '1',
    name: '计算机科学与技术',
    slug: 'computer-science',
    category: '工学',
    code: '080901',
    description: '计算机科学与技术专业培养具备计算机科学与技术领域的基础理论、专业知识和应用技能，能够从事计算机系统设计、软件开发、人工智能应用等工作的高级专门人才。',
    suitable: '对数学、逻辑思维有浓厚兴趣，有较强的抽象思维能力和动手能力，对新技术有好奇心和学习热情的学生。',
    courses: [
      '数据结构与算法', 
      '计算机组成原理', 
      '操作系统', 
      '计算机网络', 
      '软件工程', 
      '数据库系统', 
      '编译原理', 
      '人工智能导论'
    ],
    skills: [
      '程序设计能力', 
      '算法分析能力', 
      '系统设计能力', 
      '软件开发能力', 
      '团队协作能力'
    ],
    degreeYears: 4,
    employment: {
      industry: 'IT互联网、金融科技、通信、人工智能',
      positions: ['软件工程师', '系统架构师', '测试工程师', '数据科学家', '算法工程师'],
      prospectRating: 5,
      averageSalary: '8,000-20,000元/月起步'
    },
    topUniversities: [
      { name: '清华大学', ranking: 1, location: '北京' },
      { name: '北京大学', ranking: 2, location: '北京' },
      { name: '浙江大学', ranking: 3, location: '浙江' },
      { name: '上海交通大学', ranking: 4, location: '上海' },
      { name: '南京大学', ranking: 5, location: '江苏' }
    ],
    relatedMajors: ['软件工程', '人工智能', '网络工程', '数据科学与大数据技术'],
    featured: true
  },
  {
    id: '2',
    name: '软件工程',
    slug: 'software-engineering',
    category: '工学',
    code: '080902',
    description: '软件工程专业培养具备扎实的计算机理论基础和系统的软件开发方法，掌握规范的软件设计与项目管理技能的高级专门人才。',
    suitable: '有良好的数理基础，善于沟通，具有团队合作精神，对软件开发和项目管理有兴趣的学生。',
    courses: [
      '软件工程导论', 
      '需求分析与系统设计', 
      '软件测试与质量保证', 
      '软件项目管理', 
      'Web开发技术', 
      '移动应用开发', 
      '云计算技术'
    ],
    skills: [
      '软件开发能力', 
      '项目管理能力', 
      '团队协作能力', 
      '沟通表达能力', 
      '问题分析与解决能力'
    ],
    degreeYears: 4,
    employment: {
      industry: 'IT互联网、企业软件、移动互联网、电子商务',
      positions: ['软件开发工程师', '项目经理', '产品经理', '测试工程师', 'DevOps工程师'],
      prospectRating: 5,
      averageSalary: '8,000-18,000元/月起步'
    },
    topUniversities: [
      { name: '华东师范大学', ranking: 1, location: '上海' },
      { name: '北京航空航天大学', ranking: 2, location: '北京' },
      { name: '西安电子科技大学', ranking: 3, location: '陕西' },
      { name: '南京大学', ranking: 4, location: '江苏' },
      { name: '哈尔滨工业大学', ranking: 5, location: '黑龙江' }
    ],
    relatedMajors: ['计算机科学与技术', '信息安全', '网络工程', '电子商务'],
    featured: true
  },
  {
    id: '3',
    name: '临床医学',
    slug: 'clinical-medicine',
    category: '医学',
    code: '100201',
    description: '临床医学专业培养具备基础医学、临床医学的基本理论和技能，能够从事临床医疗、预防、保健、康复等工作的医学专门人才。',
    suitable: '有爱心和责任感，对医学有强烈兴趣，有较强的学习能力和心理承受能力，不怕辛苦的学生。',
    courses: [
      '人体解剖学', 
      '生理学', 
      '病理学', 
      '药理学', 
      '内科学', 
      '外科学', 
      '妇产科学', 
      '儿科学'
    ],
    skills: [
      '临床诊断能力', 
      '临床思维能力', 
      '操作技能', 
      '沟通能力', 
      '团队协作能力'
    ],
    degreeYears: 5,
    employment: {
      industry: '医院、医疗机构、医药企业、健康管理',
      positions: ['临床医生', '医学研究员', '医药代表', '健康管理师'],
      prospectRating: 5,
      averageSalary: '6,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '北京协和医学院', ranking: 1, location: '北京' },
      { name: '上海交通大学医学院', ranking: 2, location: '上海' },
      { name: '中山大学', ranking: 3, location: '广东' },
      { name: '四川大学', ranking: 4, location: '四川' },
      { name: '浙江大学医学院', ranking: 5, location: '浙江' }
    ],
    relatedMajors: ['基础医学', '中医学', '口腔医学', '公共卫生学'],
    featured: true
  },
  {
    id: '4',
    name: '金融学',
    slug: 'finance',
    category: '经济学',
    code: '020301K',
    description: '金融学专业培养具备金融理论基础和金融实务技能，能够在银行、证券、保险等金融机构以及政府部门从事金融管理工作的专门人才。',
    suitable: '数学基础扎实，对经济和金融有浓厚兴趣，有较强的分析能力和良好的沟通表达能力的学生。',
    courses: [
      '微观经济学', 
      '宏观经济学', 
      '金融学', 
      '国际金融', 
      '公司金融', 
      '投资学', 
      '商业银行经营管理', 
      '证券投资'
    ],
    skills: [
      '财务分析能力', 
      '金融市场分析能力', 
      '风险评估能力', 
      '投资决策能力', 
      '数据处理能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '银行、证券、保险、投资、互联网金融',
      positions: ['银行业务经理', '证券分析师', '投资顾问', '金融产品经理', '风险控制专员'],
      prospectRating: 4,
      averageSalary: '7,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '中国人民大学', ranking: 1, location: '北京' },
      { name: '北京大学', ranking: 2, location: '北京' },
      { name: '清华大学', ranking: 3, location: '北京' },
      { name: '上海交通大学', ranking: 4, location: '上海' },
      { name: '复旦大学', ranking: 5, location: '上海' }
    ],
    relatedMajors: ['金融工程', '经济学', '会计学', '国际经济与贸易'],
    featured: true
  },
  {
    id: '5',
    name: '法学',
    slug: 'law',
    category: '法学',
    code: '030101K',
    description: '法学专业培养具备法学基础理论和专业知识，能够在司法机关、政府部门、企事业单位等从事法律实务工作的高级专门人才。',
    suitable: '逻辑思维清晰，语言表达能力强，有较强的分析问题和解决问题的能力，关注社会问题的学生。',
    courses: [
      '法理学', 
      '宪法学', 
      '民法学', 
      '刑法学', 
      '商法学', 
      '经济法学', 
      '诉讼法学', 
      '国际法学'
    ],
    skills: [
      '法律思维能力', 
      '法律分析能力', 
      '法律文书写作能力', 
      '语言表达能力', 
      '案例分析能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '律师事务所、法院、检察院、政府机关、企业法务',
      positions: ['律师', '法官', '检察官', '公务员', '企业法务'],
      prospectRating: 4,
      averageSalary: '6,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '中国人民大学', ranking: 1, location: '北京' },
      { name: '北京大学', ranking: 2, location: '北京' },
      { name: '清华大学', ranking: 3, location: '北京' },
      { name: '武汉大学', ranking: 4, location: '湖北' },
      { name: '中国政法大学', ranking: 5, location: '北京' }
    ],
    relatedMajors: ['政治学与行政学', '国际政治', '社会学', '公安学'],
    featured: true
  },
  {
    id: '6',
    name: '英语',
    slug: 'english',
    category: '文学',
    code: '050201',
    description: '英语专业培养具备扎实的英语语言基础和广泛的文化知识，能够在外事、教育、经贸、文化等领域从事翻译、教学、管理等工作的英语专门人才。',
    suitable: '对英语和英语文化有浓厚兴趣，有较好的英语基础和语言天赋，表达能力强，有跨文化交流意识的学生。',
    courses: [
      '综合英语', 
      '英语听力', 
      '英语口语', 
      '英语写作', 
      '英美文学', 
      '翻译理论与实践', 
      '跨文化交际', 
      '语言学概论'
    ],
    skills: [
      '英语听说读写能力', 
      '翻译能力', 
      '跨文化交际能力', 
      '文学鉴赏能力', 
      '信息获取与处理能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '外资企业、教育机构、出版传媒、旅游服务、国际贸易',
      positions: ['英语教师', '翻译', '外贸专员', '文案策划', '涉外秘书'],
      prospectRating: 3,
      averageSalary: '5,000-12,000元/月起步'
    },
    topUniversities: [
      { name: '北京外国语大学', ranking: 1, location: '北京' },
      { name: '上海外国语大学', ranking: 2, location: '上海' },
      { name: '南京大学', ranking: 3, location: '江苏' },
      { name: '广东外语外贸大学', ranking: 4, location: '广东' },
      { name: '北京大学', ranking: 5, location: '北京' }
    ],
    relatedMajors: ['商务英语', '翻译', '国际商务', '外国语言文学'],
    featured: false
  },
  {
    id: '7',
    name: '建筑学',
    slug: 'architecture',
    category: '工学',
    code: '082801',
    description: '建筑学专业培养具备建筑设计、城市设计、室内设计等方面的知识与能力，能够从事建筑设计、规划设计、环境设计等工作的高级专门人才。',
    suitable: '有艺术天赋和空间想象力，动手能力强，对建筑和环境设计有浓厚兴趣，有较好的数学物理基础的学生。',
    courses: [
      '建筑设计基础', 
      '建筑设计', 
      '中外建筑史', 
      '建筑构造', 
      '建筑物理', 
      '城市规划原理', 
      '建筑结构', 
      '室内设计'
    ],
    skills: [
      '建筑设计能力', 
      '设计表达能力', 
      '空间想象能力', 
      '艺术创作能力', 
      '工程实践能力'
    ],
    degreeYears: 5,
    employment: {
      industry: '建筑设计院、规划设计院、房地产开发、装饰公司',
      positions: ['建筑师', '城市规划师', '室内设计师', '景观设计师', '建筑项目管理'],
      prospectRating: 4,
      averageSalary: '6,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '清华大学', ranking: 1, location: '北京' },
      { name: '同济大学', ranking: 2, location: '上海' },
      { name: '东南大学', ranking: 3, location: '江苏' },
      { name: '天津大学', ranking: 4, location: '天津' },
      { name: '华南理工大学', ranking: 5, location: '广东' }
    ],
    relatedMajors: ['城乡规划', '风景园林', '环境设计', '建筑环境与能源应用工程'],
    featured: false,
    requiresExam: true
  },
  {
    id: '8',
    name: '会计学',
    slug: 'accounting',
    category: '管理学',
    code: '120203K',
    description: '会计学专业培养具备管理、经济、法律和会计学等方面的知识和能力，能够在企事业单位和政府部门从事会计、审计、财务管理等工作的专门人才。',
    suitable: '数学基础扎实，有较强的逻辑思维能力和分析能力，责任心强，细心谨慎，喜欢财务和数据分析工作的学生。',
    courses: [
      '基础会计学', 
      '中级财务会计', 
      '成本会计', 
      '管理会计', 
      '审计学', 
      '财务管理', 
      '税法', 
      '会计信息系统'
    ],
    skills: [
      '会计核算能力', 
      '财务分析能力', 
      '审计能力', 
      '税务筹划能力', 
      '财务管理能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '会计师事务所、企业财务部门、银行、税务机关',
      positions: ['会计', '审计师', '财务分析师', '税务顾问', '财务经理'],
      prospectRating: 4,
      averageSalary: '6,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '中国人民大学', ranking: 1, location: '北京' },
      { name: '上海财经大学', ranking: 2, location: '上海' },
      { name: '中央财经大学', ranking: 3, location: '北京' },
      { name: '厦门大学', ranking: 4, location: '福建' },
      { name: '对外经济贸易大学', ranking: 5, location: '北京' }
    ],
    relatedMajors: ['财务管理', '审计学', '税收学', '工商管理'],
    featured: true
  },
  {
    id: '9',
    name: '机械工程',
    slug: 'mechanical-engineering',
    category: '工学',
    code: '080201',
    description: '机械工程专业培养具备机械工程的基础理论和专业知识，能够从事机械产品设计制造、科技开发和应用研究的高级工程技术人才。',
    suitable: '对机械结构和运动原理有浓厚兴趣，动手能力强，有较好的物理、数学基础，有一定的创新意识的学生。',
    courses: [
      '机械设计基础', 
      '机械制造技术基础', 
      '工程材料', 
      '控制工程基础', 
      '流体力学', 
      '热工学', 
      '电工电子技术', 
      'CAD/CAM'
    ],
    skills: [
      '机械设计能力', 
      '工程分析能力', 
      '制造工艺能力', 
      '创新设计能力', 
      '项目管理能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '制造业、汽车工业、航空航天、船舶工业、能源',
      positions: ['机械工程师', '产品设计工程师', '制造工程师', '质量工程师', '技术管理'],
      prospectRating: 4,
      averageSalary: '6,000-15,000元/月起步'
    },
    topUniversities: [
      { name: '清华大学', ranking: 1, location: '北京' },
      { name: '上海交通大学', ranking: 2, location: '上海' },
      { name: '哈尔滨工业大学', ranking: 3, location: '黑龙江' },
      { name: '西安交通大学', ranking: 4, location: '陕西' },
      { name: '浙江大学', ranking: 5, location: '浙江' }
    ],
    relatedMajors: ['车辆工程', '材料成型及控制工程', '工业设计', '机械电子工程'],
    featured: false
  },
  {
    id: '10',
    name: '教育学',
    slug: 'education',
    category: '教育学',
    code: '040101',
    description: '教育学专业培养具备教育学、心理学等方面的基本理论和基本技能，能够在教育行政部门、学校、科研机构从事教育教学、管理和研究工作的专门人才。',
    suitable: '热爱教育事业，有较强的责任感，善于沟通和表达，有亲和力，关注儿童和青少年发展的学生。',
    courses: [
      '教育学原理', 
      '中外教育史', 
      '教育心理学', 
      '教育社会学', 
      '课程与教学论', 
      '教育研究方法', 
      '教育管理学', 
      '比较教育学'
    ],
    skills: [
      '教育理论分析能力', 
      '教学设计能力', 
      '教育研究能力', 
      '组织管理能力', 
      '沟通表达能力'
    ],
    degreeYears: 4,
    employment: {
      industry: '各级学校、教育机构、出版社、研究机构、教育行政部门',
      positions: ['教师', '教育研究员', '教育管理人员', '教育咨询顾问', '教学设计师'],
      prospectRating: 3,
      averageSalary: '5,000-10,000元/月起步'
    },
    topUniversities: [
      { name: '北京师范大学', ranking: 1, location: '北京' },
      { name: '华东师范大学', ranking: 2, location: '上海' },
      { name: '南京师范大学', ranking: 3, location: '江苏' },
      { name: '华中师范大学', ranking: 4, location: '湖北' },
      { name: '东北师范大学', ranking: 5, location: '吉林' }
    ],
    relatedMajors: ['学前教育', '特殊教育', '教育技术学', '小学教育'],
    featured: false
  }
];

// 辅助函数
export const getMajorsByCategory = (category: MajorCategory): Major[] => {
  return allMajors.filter(major => major.category === category);
};

export const getFeaturedMajors = (count: number = 4): Major[] => {
  return allMajors
    .filter(major => major.featured)
    .sort(() => 0.5 - Math.random())
    .slice(0, count);
};

export const getMajorBySlug = (slug: string): Major | undefined => {
  return allMajors.find(major => major.slug === slug);
};

export const getAllCategories = (): MajorCategory[] => {
  const categories = new Set<MajorCategory>();
  allMajors.forEach(major => categories.add(major.category));
  return Array.from(categories);
};

export const searchMajors = (keyword: string): Major[] => {
  const lowerKeyword = keyword.toLowerCase();
  return allMajors.filter(major => 
    major.name.toLowerCase().includes(lowerKeyword) ||
    major.description.toLowerCase().includes(lowerKeyword) ||
    major.skills.some(skill => skill.toLowerCase().includes(lowerKeyword)) ||
    major.employment.industry.toLowerCase().includes(lowerKeyword) ||
    major.employment.positions.some(position => position.toLowerCase().includes(lowerKeyword))
  );
};

export const getRelatedMajors = (majorSlug: string, count: number = 3): Major[] => {
  const major = getMajorBySlug(majorSlug);
  if (!major) return [];
  
  const relatedSlugs = major.relatedMajors;
  const relatedMajors = allMajors.filter(m => relatedSlugs.includes(m.name));
  
  // 如果相关专业不够，补充同类别的专业
  if (relatedMajors.length < count) {
    const sameCategoryMajors = allMajors.filter(
      m => m.category === major.category && m.slug !== majorSlug && !relatedSlugs.includes(m.name)
    );
    
    return [...relatedMajors, ...sameCategoryMajors].slice(0, count);
  }
  
  return relatedMajors.slice(0, count);
}; 