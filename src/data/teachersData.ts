// 教师部门/学科类型
export type TeacherDepartment = '语文组' | '数学组' | '英语组' | '物理组' | '化学组' | 
  '生物组' | '政治组' | '历史组' | '地理组' | '信息技术组' | '音乐组' | '美术组' | '体育组' | '心理健康组';

// 教师职称类型
export type TeacherTitle = '特级教师' | '高级教师' | '一级教师' | '二级教师' | '三级教师';

// 教师荣誉类型
export interface TeacherHonor {
  id: number;
  title: string;
  year: number;
  level: '国家级' | '省级' | '市级' | '区级' | '校级';
}

// 教师发表论文/著作类型
export interface TeacherPublication {
  id: number;
  title: string;
  publisher: string;
  year: number;
  type: '论文' | '著作' | '教材';
  link?: string;
}

// 教师项目类型
export interface TeacherProject {
  id: number;
  title: string;
  role: string;
  year: number;
  description: string;
  level: '国家级' | '省级' | '市级' | '区级' | '校级';
}

// 教师数据模型
export interface Teacher {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  title: TeacherTitle;
  department: TeacherDepartment;
  position?: string; // 职务，如"教研组长"
  education: string; // 学历，如"硕士研究生"
  major: string; // 专业，如"汉语言文学"
  teachingYears: number; // 教龄
  introduction: string; // 简介
  email?: string;
  researchFields?: string[]; // 研究方向
  teachingPhilosophy?: string; // 教学理念
  achievements?: string; // 教学成就
  honors?: TeacherHonor[]; // 获得的荣誉
  publications?: TeacherPublication[]; // 发表的论文/著作
  projects?: TeacherProject[]; // 参与的教研项目
  courses?: string[]; // 授课科目
  officeHours?: string; // 办公时间
  featured?: boolean; // 是否为特色教师（用于首页展示）
}

// 示例数据 - 教师列表
export const allTeachers: Teacher[] = [
  {
    id: "t001",
    name: "王立",
    slug: "wang-li",
    avatar: "/teachers/teacher1.jpg",
    title: "特级教师",
    department: "语文组",
    position: "语文教研组长",
    education: "北京师范大学硕士",
    major: "中国现当代文学",
    teachingYears: 25,
    introduction: "王立老师从教25年，曾获全国优秀教师、省级教学能手等荣誉称号。教学风格严谨而不失幽默，深受学生喜爱。在语文教学领域有丰富的经验和独到的见解，发表多篇教学论文，参与编写多本教材。",
    email: "wangli@jszhongxue.edu.cn",
    researchFields: ["语文课堂教学方法创新", "中学生阅读能力培养", "作文教学研究"],
    teachingPhilosophy: "教育的本质在于激发学生的内在潜能和学习兴趣。语文教学不仅是传授知识，更是培养学生的人文素养和思考能力。我始终相信，每个学生都有自己独特的才华和潜力，教师的职责是帮助他们发现并发展这些潜能。",
    achievements: "所教班级多次在全国中学生语文能力大赛中获奖，50余名学生在省级以上作文竞赛中获奖。",
    honors: [
      { id: 1, title: "全国优秀教师", year: 2018, level: "国家级" },
      { id: 2, title: "省级特级教师", year: 2015, level: "省级" },
      { id: 3, title: "市级教学能手", year: 2013, level: "市级" }
    ],
    publications: [
      { id: 1, title: "《高中语文有效教学策略》", publisher: "教育出版社", year: 2019, type: "著作" },
      { id: 2, title: "论中学语文阅读教学中的问题导向", publisher: "中学语文教学", year: 2017, type: "论文" },
      { id: 3, title: "高中生写作能力培养的实践与思考", publisher: "语文教学与研究", year: 2016, type: "论文" }
    ],
    projects: [
      { id: 1, title: "高中语文核心素养教学研究", role: "主持人", year: 2019, description: "探索基于核心素养的语文教学模式，开发相关教学资源", level: "省级" },
      { id: 2, title: "中学生阅读能力提升策略研究", role: "主要参与者", year: 2017, description: "研究中学生阅读水平现状及提升策略，形成系统性方案", level: "市级" }
    ],
    courses: ["高一语文", "高二语文", "高三语文", "文学选修课"],
    officeHours: "周一至周五 14:00-16:00",
    featured: true
  },
  {
    id: "t002",
    name: "张智",
    slug: "zhang-zhi",
    avatar: "/teachers/teacher2.jpg",
    title: "高级教师",
    department: "数学组",
    position: "数学教研组长",
    education: "清华大学博士",
    major: "应用数学",
    teachingYears: 18,
    introduction: "张智老师毕业于清华大学应用数学专业，获博士学位。从教18年来，致力于中学数学教学研究和实践，教学成果显著。张老师注重培养学生的数学思维和解决问题的能力，倡导启发式教学方法，深受学生和家长好评。",
    email: "zhangzhi@jszhongxue.edu.cn",
    researchFields: ["数学思维培养", "解题策略研究", "数学建模教学"],
    teachingPhilosophy: "数学不仅是一门学科，更是一种思维方式。我注重培养学生的逻辑思维和问题解决能力，鼓励学生从多角度思考问题，发现数学的美和实用价值。在教学中，我强调'为什么'而不仅仅是'是什么'，帮助学生建立深层次的数学理解。",
    achievements: "指导学生在全国中学生数学奥林匹克竞赛中获金牌3枚、银牌5枚。所教班级高考数学平均分连续五年位居市前列。",
    honors: [
      { id: 1, title: "省优秀教师", year: 2020, level: "省级" },
      { id: 2, title: "市级数学学科带头人", year: 2018, level: "市级" },
      { id: 3, title: "区优秀教育工作者", year: 2016, level: "区级" }
    ],
    publications: [
      { id: 1, title: "《高中数学思维方法与技巧》", publisher: "数学教育出版社", year: 2018, type: "著作" },
      { id: 2, title: "高中数学解题策略分析", publisher: "数学教学", year: 2017, type: "论文" }
    ],
    projects: [
      { id: 1, title: "中学数学思维培养研究", role: "主持人", year: 2019, description: "研究中学生数学思维发展规律，提出培养策略和方法", level: "市级" }
    ],
    courses: ["高一数学", "高二数学", "高三数学", "数学竞赛培训"],
    officeHours: "周一、周三、周五 15:00-17:00",
    featured: true
  },
  {
    id: "t003",
    name: "林青",
    slug: "lin-qing",
    avatar: "/teachers/teacher3.jpg",
    title: "高级教师",
    department: "英语组",
    education: "北京外国语大学硕士",
    major: "英语语言文学",
    teachingYears: 15,
    introduction: "林青老师毕业于北京外国语大学，英语语言文学硕士。从教15年，拥有丰富的英语教学经验。教学风格活泼生动，善于创设真实的语言环境，激发学生学习兴趣。曾获市级教学比赛一等奖，省级优秀教师等荣誉。",
    email: "linqing@jszhongxue.edu.cn",
    researchFields: ["英语听说能力培养", "跨文化交际教学", "英语课堂活动设计"],
    teachingPhilosophy: "语言学习的最终目的是交流。我注重在课堂上创造真实的语言环境，通过丰富多样的活动让学生在实践中学习和应用英语。我相信兴趣是最好的老师，努力让每个学生都能在英语学习中找到乐趣和成就感。",
    achievements: "指导学生在'21世纪杯'英语演讲比赛中多次获奖，所教班级英语四级通过率达95%以上。",
    honors: [
      { id: 1, title: "省级优秀教师", year: 2019, level: "省级" },
      { id: 2, title: "市级英语教学能手", year: 2017, level: "市级" }
    ],
    publications: [
      { id: 1, title: "中学英语课堂活动设计与实施", publisher: "外语教学与研究", year: 2018, type: "论文" },
      { id: 2, title: "高中英语口语教学策略探析", publisher: "中学英语教学", year: 2016, type: "论文" }
    ],
    courses: ["高一英语", "高二英语", "高三英语", "英语口语"],
    officeHours: "周二、周四 14:00-16:00",
    featured: true
  },
  {
    id: "t004",
    name: "陈博",
    slug: "chen-bo",
    avatar: "/teachers/teacher4.jpg",
    title: "高级教师",
    department: "物理组",
    education: "北京大学硕士",
    major: "物理学",
    teachingYears: 16,
    introduction: "陈博老师毕业于北京大学物理学专业，从教16年。教学严谨细致，注重培养学生的物理思维和实验能力。曾获省级优秀教师、市级教学能手等荣誉。在物理教学领域有较深研究，多次参与国家级教研项目。",
    email: "chenbo@jszhongxue.edu.cn",
    researchFields: ["物理实验教学", "物理思维培养", "科学素养教育"],
    teachingPhilosophy: "物理学是理解自然的钥匙。我鼓励学生通过观察、实验和思考来探索物理现象背后的规律，培养他们的科学思维和探究精神。在教学中，我注重理论与实践相结合，帮助学生建立物理概念与日常生活的联系。",
    honors: [
      { id: 1, title: "省级优秀教师", year: 2018, level: "省级" },
      { id: 2, title: "市级物理学科带头人", year: 2016, level: "市级" }
    ],
    publications: [
      { id: 1, title: "高中物理实验教学设计与评价", publisher: "物理教学", year: 2019, type: "论文" },
      { id: 2, title: "《趣味物理实验手册》", publisher: "科学教育出版社", year: 2017, type: "著作" }
    ],
    projects: [
      { id: 1, title: "高中物理实验教学改革研究", role: "主持人", year: 2018, description: "研究实验教学新方法，开发创新性实验项目", level: "省级" }
    ],
    courses: ["高一物理", "高二物理", "高三物理", "物理竞赛培训"],
    featured: false
  },
  {
    id: "t005",
    name: "李梅",
    slug: "li-mei",
    avatar: "/teachers/teacher5.jpg",
    title: "一级教师",
    department: "化学组",
    education: "南京大学本科",
    major: "化学",
    teachingYears: 10,
    introduction: "李梅老师毕业于南京大学化学专业，从教10年。教学风格生动活泼，善于将抽象的化学知识形象化，使学生易于理解和掌握。注重培养学生的实验操作能力和科学探究精神。曾获市级优秀青年教师等荣誉。",
    email: "limei@jszhongxue.edu.cn",
    researchFields: ["化学实验教学", "趣味化学研究"],
    teachingPhilosophy: "化学是一门实验科学，亲身体验是最好的学习方式。我致力于创造生动有趣的化学课堂，通过实验演示、视频资料和实践活动，让抽象的化学概念变得直观易懂。同时，我注重培养学生的环保意识，引导他们理解化学在日常生活中的应用。",
    honors: [
      { id: 1, title: "市级优秀青年教师", year: 2020, level: "市级" },
      { id: 2, title: "区级教学能手", year: 2018, level: "区级" }
    ],
    publications: [
      { id: 1, title: "中学化学实验教学中的常见问题与对策", publisher: "化学教育", year: 2019, type: "论文" }
    ],
    courses: ["高一化学", "高二化学", "高三化学"],
    featured: false
  },
  {
    id: "t006",
    name: "赵阳",
    slug: "zhao-yang",
    avatar: "/teachers/teacher6.jpg",
    title: "高级教师",
    department: "生物组",
    position: "生物教研组长",
    education: "中国农业大学硕士",
    major: "分子生物学",
    teachingYears: 12,
    introduction: "赵阳老师毕业于中国农业大学，获分子生物学硕士学位。从教12年，教学经验丰富。教学风格深入浅出，善于将复杂的生物学知识转化为学生易于理解的内容。注重培养学生的科学思维和实验能力，多次带领学生参加科技创新大赛并获奖。",
    email: "zhaoyang@jszhongxue.edu.cn",
    researchFields: ["生物实验教学", "生物技术教育", "生态环保教育"],
    teachingPhilosophy: "生物学是探索生命奥秘的科学。我鼓励学生带着好奇心和敬畏之心学习生物，通过观察、实验和思考来理解生命的多样性和复杂性。在教学中，我注重培养学生的科学素养和环保意识，引导他们思考生物科技发展对人类社会的影响。",
    honors: [
      { id: 1, title: "市级学科带头人", year: 2019, level: "市级" },
      { id: 2, title: "区级优秀教师", year: 2017, level: "区级" }
    ],
    publications: [
      { id: 1, title: "中学生物实验教学策略研究", publisher: "生物教学", year: 2018, type: "论文" }
    ],
    projects: [
      { id: 1, title: "中学生物技术教育研究", role: "负责人", year: 2019, description: "探索生物技术在中学教育中的应用，开发相关教学资源", level: "市级" }
    ],
    courses: ["高一生物", "高二生物", "高三生物", "生物技术选修课"],
    featured: false
  },
  {
    id: "t007",
    name: "钱文",
    slug: "qian-wen",
    avatar: "/teachers/teacher7.jpg",
    title: "高级教师",
    department: "政治组",
    education: "人民大学硕士",
    major: "思想政治教育",
    teachingYears: 14,
    introduction: "钱文老师毕业于中国人民大学，获思想政治教育硕士学位。从教14年，具有丰富的政治教学经验。教学风格生动活泼，善于结合时事热点进行教学，使抽象的理论贴近学生生活。注重培养学生的批判性思维和社会责任感。",
    email: "qianwen@jszhongxue.edu.cn",
    researchFields: ["思想政治教育创新", "时政教育研究"],
    teachingPhilosophy: "政治教育不仅是传授知识，更是培养公民素养。我注重将抽象的理论与现实生活相结合，通过案例分析、时事讨论和社会实践，帮助学生形成正确的价值观和批判性思维。我鼓励学生关注社会发展，积极参与公共事务，成为有责任感的社会公民。",
    honors: [
      { id: 1, title: "市级优秀教师", year: 2019, level: "市级" },
      { id: 2, title: "区级教学能手", year: 2017, level: "区级" }
    ],
    publications: [
      { id: 1, title: "高中思想政治课教学方法创新研究", publisher: "思想政治课教学", year: 2018, type: "论文" }
    ],
    courses: ["高一政治", "高二政治", "高三政治", "时事政治选修课"],
    featured: false
  },
  {
    id: "t008",
    name: "孙华",
    slug: "sun-hua",
    avatar: "/teachers/teacher8.jpg",
    title: "特级教师",
    department: "历史组",
    position: "历史教研组长",
    education: "北京师范大学博士",
    major: "中国古代史",
    teachingYears: 22,
    introduction: "孙华老师毕业于北京师范大学，获中国古代史博士学位。从教22年，是学校资深历史教师。教学风格深入浅出，善于将历史故事与史料分析相结合，培养学生的历史思维和人文素养。曾获省特级教师、市优秀教师等荣誉。",
    email: "sunhua@jszhongxue.edu.cn",
    researchFields: ["历史教学方法创新", "历史思维培养", "历史文化教育"],
    teachingPhilosophy: "历史不仅是过去的记忆，更是面向未来的智慧。我致力于帮助学生理解历史发展的规律和多元文化的价值，培养他们的历史思维和人文关怀。在教学中，我注重史料分析与历史解释相结合，引导学生从多角度理解历史事件，形成自己的历史观点。",
    achievements: "指导学生在全国中学生历史知识竞赛中多次获奖，编写的校本教材《历史与文化》在市内多所学校使用。",
    honors: [
      { id: 1, title: "省特级教师", year: 2017, level: "省级" },
      { id: 2, title: "市历史学科带头人", year: 2015, level: "市级" }
    ],
    publications: [
      { id: 1, title: "《中学历史思维培养理论与实践》", publisher: "教育科学出版社", year: 2019, type: "著作" },
      { id: 2, title: "论历史教学中的价值观教育", publisher: "历史教学", year: 2017, type: "论文" }
    ],
    projects: [
      { id: 1, title: "中学历史学科核心素养研究", role: "主持人", year: 2018, description: "研究历史学科核心素养的内涵和培养路径，开发相关教学资源", level: "省级" }
    ],
    courses: ["高一历史", "高二历史", "高三历史", "历史与文化选修课"],
    officeHours: "周一、周三 15:00-17:00",
    featured: true
  },
  {
    id: "t009",
    name: "周明",
    slug: "zhou-ming",
    avatar: "/teachers/teacher9.jpg",
    title: "一级教师",
    department: "地理组",
    education: "华东师范大学硕士",
    major: "人文地理学",
    teachingYears: 8,
    introduction: "周明老师毕业于华东师范大学，获人文地理学硕士学位。从教8年，教学经验丰富。教学风格生动活泼，善于利用多媒体技术和案例教学，使地理知识形象直观。注重培养学生的空间思维和环境意识，经常组织学生进行实地考察和环保活动。",
    email: "zhouming@jszhongxue.edu.cn",
    researchFields: ["地理实践教学", "环境教育研究"],
    teachingPhilosophy: "地理是连接自然与人文的桥梁。我注重培养学生的地理思维和环境意识，通过实地考察、案例分析和地图解读，帮助学生理解地理环境与人类活动的相互关系。在教学中，我鼓励学生关注全球议题和区域发展，培养他们的地理素养和可持续发展理念。",
    honors: [
      { id: 1, title: "区级教学新秀", year: 2020, level: "区级" }
    ],
    courses: ["高一地理", "高二地理", "高三地理", "地理实践活动"],
    featured: false
  },
  {
    id: "t010",
    name: "郑强",
    slug: "zheng-qiang",
    avatar: "/teachers/teacher10.jpg",
    title: "高级教师",
    department: "体育组",
    position: "体育教研组长",
    education: "北京体育大学本科",
    major: "体育教育",
    teachingYears: 15,
    introduction: "郑强老师毕业于北京体育大学体育教育专业，从教15年。曾是省级篮球运动员，具有丰富的体育教学和训练经验。教学风格严格而富有激情，注重培养学生的体育兴趣和终身锻炼意识。带领校篮球队多次在市级比赛中获奖。",
    email: "zhengqiang@jszhongxue.edu.cn",
    researchFields: ["体育教学方法创新", "学生体质健康研究", "校园体育文化建设"],
    teachingPhilosophy: "体育不仅是锻炼身体，更是塑造品格。我注重培养学生的运动技能、健康意识和团队精神，通过多样化的体育活动激发学生的运动兴趣，帮助他们养成终身锻炼的习惯。在教学中，我坚持'健康第一'的理念，关注每个学生的体质发展，为他们的健康成长提供支持。",
    honors: [
      { id: 1, title: "市级优秀体育教师", year: 2019, level: "市级" },
      { id: 2, title: "区级体育教学能手", year: 2017, level: "区级" }
    ],
    publications: [
      { id: 1, title: "中学体育教学中的兴趣培养研究", publisher: "体育教学", year: 2018, type: "论文" }
    ],
    courses: ["高中体育", "篮球选修课", "体能训练"],
    featured: false
  },
  {
    id: "t011",
    name: "田芳",
    slug: "tian-fang",
    avatar: "/teachers/teacher11.jpg",
    title: "高级教师",
    department: "音乐组",
    education: "中央音乐学院硕士",
    major: "音乐教育",
    teachingYears: 12,
    introduction: "田芳老师毕业于中央音乐学院，获音乐教育硕士学位。从教12年，具有丰富的音乐教学经验。教学风格活泼生动，善于激发学生的音乐兴趣和创造力。指导学校合唱团多次在市级比赛中获奖，组织策划了多场校园音乐会。",
    email: "tianfang@jszhongxue.edu.cn",
    researchFields: ["音乐鉴赏教学", "合唱指导", "音乐治疗"],
    teachingPhilosophy: "音乐是心灵的语言，是情感的表达。我致力于帮助每个学生发现音乐的美和力量，无论他们是否有特殊的音乐天赋。在教学中，我注重音乐理论与实践相结合，通过歌唱、乐器演奏和音乐鉴赏，培养学生的音乐素养和审美能力。同时，我鼓励学生通过音乐表达自我，体验音乐带来的快乐和成就感。",
    honors: [
      { id: 1, title: "市级音乐教学能手", year: 2018, level: "市级" }
    ],
    publications: [
      { id: 1, title: "中学音乐鉴赏教学策略探究", publisher: "音乐教育", year: 2019, type: "论文" }
    ],
    courses: ["音乐欣赏", "合唱团", "钢琴选修课"],
    featured: false
  },
  {
    id: "t012",
    name: "吴佳",
    slug: "wu-jia",
    avatar: "/teachers/teacher12.jpg",
    title: "一级教师",
    department: "心理健康组",
    education: "北京师范大学硕士",
    major: "发展与教育心理学",
    teachingYears: 7,
    introduction: "吴佳老师毕业于北京师范大学，获发展与教育心理学硕士学位。具有心理咨询师资格证书，从事心理健康教育工作7年。教学风格亲和力强，善于与学生建立信任关系，帮助学生解决成长过程中的心理困惑。开设的心理健康课深受学生喜爱。",
    email: "wujia@jszhongxue.edu.cn",
    researchFields: ["青少年心理健康教育", "学业压力调适", "积极心理学应用"],
    teachingPhilosophy: "心理健康教育是帮助学生认识自我、接纳自我、发展自我的过程。我注重创造安全、信任的教育环境，通过体验活动、案例分析和个别辅导，帮助学生增强心理素质，学会管理情绪，建立积极的人生态度。在教学中，我坚持'以学生为中心'的理念，尊重每个学生的个体差异，为他们的健康成长提供心理支持。",
    honors: [
      { id: 1, title: "区级心理健康教育先进个人", year: 2020, level: "区级" }
    ],
    publications: [
      { id: 1, title: "高中生学业压力调适策略研究", publisher: "心理健康教育", year: 2019, type: "论文" }
    ],
    courses: ["心理健康教育", "压力管理", "生涯规划"],
    officeHours: "周二、周四 14:00-16:00 (心理咨询室)",
    featured: false
  }
];

// 根据部门获取教师列表
export const getTeachersByDepartment = (department: TeacherDepartment): Teacher[] => {
  return allTeachers.filter(teacher => teacher.department === department);
};

// 根据职称获取教师列表
export const getTeachersByTitle = (title: TeacherTitle): Teacher[] => {
  return allTeachers.filter(teacher => teacher.title === title);
};

// 获取特色教师列表（用于首页展示）
export const getFeaturedTeachers = (): Teacher[] => {
  return allTeachers.filter(teacher => teacher.featured);
};

// 根据slug获取单个教师信息
export const getTeacherBySlug = (slug: string): Teacher | undefined => {
  return allTeachers.find(teacher => teacher.slug === slug);
};

// 获取所有教师部门列表（无重复）
export const getAllDepartments = (): TeacherDepartment[] => {
  const departments = allTeachers.map(teacher => teacher.department);
  return [...new Set(departments)] as TeacherDepartment[];
};

// 获取所有教师职称列表（无重复）
export const getAllTitles = (): TeacherTitle[] => {
  const titles = allTeachers.map(teacher => teacher.title);
  return [...new Set(titles)] as TeacherTitle[];
}; 