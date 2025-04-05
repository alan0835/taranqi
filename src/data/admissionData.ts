// 招生年份类型
export type AdmissionYear = '2024' | '2023' | '2022' | '2021' | '2020';

// 招生类型
export type AdmissionType = '小升初' | '初升高' | '国际班' | '艺术特长生' | '体育特长生';

// 招生状态
export type AdmissionStatus = '未开始' | '报名中' | '考试中' | '录取中' | '已结束';

// 招生问答类型
export interface AdmissionFAQ {
  id: string;
  question: string;
  answer: string;
  category: '报名条件' | '考试内容' | '录取政策' | '缴费事项' | '其他';
}

// 招生计划
export interface AdmissionPlan {
  id: string;
  year: AdmissionYear;
  type: AdmissionType;
  planCount: number;  // 计划招生人数
  actualCount?: number; // 实际招生人数
  classCount: number;  // 班级数量
  requirements: string; // 招生要求
  examSubjects: string[]; // 考试科目
  status: AdmissionStatus;
}

// 入学考试时间安排
export interface ExamSchedule {
  id: string;
  year: AdmissionYear;
  type: AdmissionType;
  registrationStart: string; // 报名开始时间
  registrationEnd: string;   // 报名结束时间
  examDate: string;          // 考试日期
  examTimeRange: string;     // 考试时间段
  examLocation: string;      // 考试地点
  notificationDate: string;  // 通知日期
  enrollmentDate: string;    // 入学日期
}

// 历年录取分数线
export interface AdmissionScore {
  id: string;
  year: AdmissionYear;
  type: AdmissionType;
  minimumScore: number;      // 最低录取分数
  averageScore: number;      // 平均分数
  highestScore: number;      // 最高分数
  notes?: string;            // 备注
}

// 招生公告
export interface AdmissionNotice {
  id: string;
  title: string;
  slug: string;
  content: string;
  publishDate: string;
  year: AdmissionYear;
  type: AdmissionType;
  isImportant: boolean;      // 是否重要通知
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
}

// 招生政策
export interface AdmissionPolicy {
  id: string;
  title: string;
  slug: string;
  content: string;
  year: AdmissionYear;
  type: AdmissionType;
  publishDate: string;
  lastUpdated: string;
}

// 招生宣传资料
export interface AdmissionMaterial {
  id: string;
  title: string;
  type: '宣传册' | '视频' | '图片' | '文档';
  description: string;
  thumbnailUrl: string;
  fileUrl: string;
  fileSize?: string;
  year: AdmissionYear;
}

// 生成样本数据

// 招生计划样本数据
export const admissionPlans: AdmissionPlan[] = [
  {
    id: '1',
    year: '2024',
    type: '初升高',
    planCount: 500,
    classCount: 10,
    requirements: '参加全市统一中考，并达到我校录取分数线',
    examSubjects: ['语文', '数学', '英语', '物理', '化学'],
    status: '报名中',
  },
  {
    id: '2',
    year: '2024',
    type: '小升初',
    planCount: 300,
    classCount: 6,
    requirements: '参加我校自主招生考试，综合评价达到录取标准',
    examSubjects: ['语文', '数学', '英语'],
    status: '未开始',
  },
  {
    id: '3',
    year: '2024',
    type: '国际班',
    planCount: 60,
    classCount: 2,
    requirements: '参加我校国际班入学考试，英语能力测试达到B1水平',
    examSubjects: ['英语能力测试', '面试'],
    status: '未开始',
  },
  {
    id: '4',
    year: '2024',
    type: '艺术特长生',
    planCount: 30,
    classCount: 1,
    requirements: '具备艺术特长（音乐、美术、舞蹈等），专业测试合格，文化课达到基本要求',
    examSubjects: ['专业测试', '文化课测试'],
    status: '未开始',
  },
  {
    id: '5',
    year: '2023',
    type: '初升高',
    planCount: 500,
    actualCount: 502,
    classCount: 10,
    requirements: '参加全市统一中考，并达到我校录取分数线',
    examSubjects: ['语文', '数学', '英语', '物理', '化学'],
    status: '已结束',
  },
];

// 入学考试时间安排样本数据
export const examSchedules: ExamSchedule[] = [
  {
    id: '1',
    year: '2024',
    type: '初升高',
    registrationStart: '2024-05-01',
    registrationEnd: '2024-05-31',
    examDate: '2024-06-15',
    examTimeRange: '上午8:00-11:30，下午2:00-5:00',
    examLocation: '建设中学考试中心',
    notificationDate: '2024-07-01',
    enrollmentDate: '2024-09-01',
  },
  {
    id: '2',
    year: '2024',
    type: '小升初',
    registrationStart: '2024-04-15',
    registrationEnd: '2024-05-15',
    examDate: '2024-05-28',
    examTimeRange: '上午9:00-11:00',
    examLocation: '建设中学初中部',
    notificationDate: '2024-06-15',
    enrollmentDate: '2024-09-01',
  },
  {
    id: '3',
    year: '2024',
    type: '国际班',
    registrationStart: '2024-03-01',
    registrationEnd: '2024-04-30',
    examDate: '2024-05-15',
    examTimeRange: '上午9:00-12:00',
    examLocation: '建设中学国际部',
    notificationDate: '2024-06-01',
    enrollmentDate: '2024-09-01',
  },
];

// 历年录取分数线样本数据
export const admissionScores: AdmissionScore[] = [
  {
    id: '1',
    year: '2023',
    type: '初升高',
    minimumScore: 675,
    averageScore: 695,
    highestScore: 738,
  },
  {
    id: '2',
    year: '2022',
    type: '初升高',
    minimumScore: 670,
    averageScore: 690,
    highestScore: 735,
  },
  {
    id: '3',
    year: '2021',
    type: '初升高',
    minimumScore: 665,
    averageScore: 685,
    highestScore: 730,
  },
  {
    id: '4',
    year: '2023',
    type: '国际班',
    minimumScore: 620,
    averageScore: 650,
    highestScore: 710,
    notes: '国际班考试满分750分，含英语加试100分',
  },
];

// 招生公告样本数据
export const admissionNotices: AdmissionNotice[] = [
  {
    id: '1',
    title: '2024年高中招生报名系统开放通知',
    slug: '2024-high-school-admission-registration',
    content: `
# 2024年高中招生报名系统开放通知

尊敬的家长、亲爱的同学们：

我校2024年高中招生报名系统将于2024年5月1日上午8:00正式开放。请有意报考我校的初三学生及家长登录学校官网"招生报名"栏目进行在线报名。

## 报名须知

1. **报名时间**：2024年5月1日至5月31日
2. **报名方式**：登录学校官网在线报名系统
3. **所需材料**：
   - 学生身份证或户口本信息
   - 初中就读学校证明
   - 近期免冠照片（电子版，2MB以内）
   - 初中期间获得的主要奖项和证书（如有）

## 考试安排

1. **考试日期**：2024年6月15日
2. **考试时间**：上午8:00-11:30，下午2:00-5:00
3. **考试科目**：语文、数学、英语、物理、化学
4. **考试地点**：建设中学考试中心

## 录取公布

录取结果预计将于2024年7月1日在学校官网公布，同时向被录取学生发送录取通知书。

如有疑问，请联系我校招生办公室：
- 电话：010-12345678
- 邮箱：admission@jszhongxue.edu.cn

建设中学招生工作委员会
2024年4月25日
    `,
    publishDate: '2024-04-25',
    year: '2024',
    type: '初升高',
    isImportant: true,
    attachments: [
      {
        name: '2024年建设中学高中招生简章.pdf',
        url: '/admission/brochure-2024.pdf',
        size: '2.5MB',
      },
      {
        name: '报名系统使用指南.pdf',
        url: '/admission/registration-guide.pdf',
        size: '1.8MB',
      },
    ],
  },
  {
    id: '2',
    title: '2024年艺术特长生招生计划公告',
    slug: '2024-art-student-admission-plan',
    content: `
# 2024年艺术特长生招生计划公告

为培养德智体美劳全面发展的人才，发掘和培养艺术特长生，我校2024年面向全市招收艺术特长生，现将相关事项公告如下：

## 招生计划

1. **招生人数**：30人
2. **招生专业**：
   - 音乐（声乐、钢琴、小提琴、长笛等）：12人
   - 美术（国画、油画、设计等）：10人
   - 舞蹈（中国舞、现代舞等）：8人

## 报考条件

1. 应届初三毕业生，品行端正，学习态度认真
2. 在艺术领域有突出表现，获得过市级以上比赛奖项
3. 文化课成绩达到初中毕业水平，各科成绩均衡

## 选拔流程

1. **初选**：提交作品集或演出视频
2. **复试**：专业技能现场考核
3. **终审**：文化课测试和综合面试

## 报名方式

请于2024年3月15日至4月15日登录学校官网"艺术特长生报名"栏目进行在线报名，并上传相关材料。

如有疑问，请联系艺术教育中心：
- 电话：010-87654321
- 邮箱：arts@jszhongxue.edu.cn

建设中学招生工作委员会
2024年3月10日
    `,
    publishDate: '2024-03-10',
    year: '2024',
    type: '艺术特长生',
    isImportant: false,
  },
  {
    id: '3',
    title: '2023年高中新生报到须知',
    slug: '2023-high-school-enrollment-notice',
    content: `
# 2023年高中新生报到须知

亲爱的2023级新生及家长：

祝贺你被我校录取！现将新生报到相关事项通知如下：

## 报到时间与地点

- **日期**：2023年8月28日至29日
- **时间**：上午8:30-11:30，下午2:00-4:30
- **地点**：建设中学学生服务中心（行政楼一楼）

## 报到所需材料

1. 录取通知书
2. 学生身份证原件及复印件
3. 户口本原件及复印件
4. 初中毕业证原件及复印件
5. 2寸免冠照片4张
6. 中考成绩单原件及复印件

## 缴费项目

1. 教材费：850元/学期
2. 住宿费（选择住宿的学生）：1200元/学期
3. 校服费：580元/套（包含夏季、冬季校服各一套）

## 入学准备

1. 新生军训时间：2023年9月1日至7日
2. 正式开学时间：2023年9月8日

如有特殊情况无法按时报到，请提前与学校招生办联系。

期待你的到来！

建设中学招生办公室
2023年8月10日
    `,
    publishDate: '2023-08-10',
    year: '2023',
    type: '初升高',
    isImportant: true,
  },
];

// 招生政策样本数据
export const admissionPolicies: AdmissionPolicy[] = [
  {
    id: '1',
    title: '2024年高中招生录取政策',
    slug: '2024-high-school-admission-policy',
    content: `
# 2024年高中招生录取政策

为确保高中招生工作公平、公正、透明，根据市教育局相关文件精神，结合我校实际情况，特制定本招生录取政策。

## 一、招生计划

2024年计划招收高一新生500人，共10个班，其中普通班8个，实验班2个。

## 二、招生对象

应届初中毕业生，参加2024年中考，且达到我校录取分数线。

## 三、录取原则

1. **统一录取**：按中考总分从高到低录取，直至完成招生计划。
2. **特长生录取**：设艺术、体育特长生计划，特长生须参加专业测试，并达到文化课最低要求。
3. **综合素质评价**：同分情况下，参考学生综合素质评价结果择优录取。

## 四、录取程序

1. 公布录取分数线
2. 对达到分数线的考生进行资格审核
3. 发放录取通知书
4. 组织新生报到注册

## 五、收费标准

严格按照市物价局批准的收费标准执行，具体收费项目和标准将在录取通知书中明确说明。

## 六、监督机制

1. 成立招生监督委员会，接受社会监督
2. 公示录取名单
3. 设立举报电话和邮箱，及时处理相关问题

本政策最终解释权归建设中学招生工作委员会所有。

建设中学招生工作委员会
2024年3月1日
    `,
    year: '2024',
    type: '初升高',
    publishDate: '2024-03-01',
    lastUpdated: '2024-03-01',
  },
  {
    id: '2',
    title: '2024年国际班招生方案',
    slug: '2024-international-class-admission-plan',
    content: `
# 2024年国际班招生方案

为培养具有国际视野和竞争力的高素质人才，我校国际部特制定2024年国际班招生方案。

## 一、项目介绍

我校国际班开设A-Level和AP两种国际课程，为学生出国深造提供坚实基础。

## 二、招生计划

2024年计划招收国际班学生60人，共2个班级：
- A-Level班：30人
- AP班：30人

## 三、申请条件

1. 应届初中毕业生或高中在读学生
2. 综合学习能力强，特别是英语水平良好
3. 有志于出国留学
4. 认同国际教育理念

## 四、选拔流程

1. **笔试**：英语能力测试和学科基础测试
2. **面试**：英文面试和中文面试
3. **综合评估**：结合笔试、面试成绩及过往学业表现综合录取

## 五、课程设置

1. **A-Level班**：数学、物理、化学、经济学、心理学等
2. **AP班**：微积分、物理、化学、生物、经济学、计算机科学等
3. **公共课程**：语言强化、大学申请指导、跨文化交流等

## 六、国际交流

1. 与英美知名高中建立姊妹学校关系
2. 组织海外研学项目
3. 邀请外籍教师和海外大学代表来校交流

## 七、升学指导

设立专门的海外升学指导中心，提供全方位的大学申请服务。

本方案最终解释权归建设中学国际部所有。

建设中学国际部
2024年2月20日
    `,
    year: '2024',
    type: '国际班',
    publishDate: '2024-02-20',
    lastUpdated: '2024-02-25',
  },
];

// 招生问答样本数据
export const admissionFAQs: AdmissionFAQ[] = [
  {
    id: '1',
    question: '学校2024年高中计划招收多少名学生？',
    answer: '我校2024年高中计划招收500名学生，分为10个班级，其中普通班8个，实验班2个。',
    category: '报名条件',
  },
  {
    id: '2',
    question: '高中招生考试考哪些科目？',
    answer: '我校高中招生依据全市统一中考成绩录取，考试科目包括语文、数学、英语、物理、化学、道德与法治、历史等。',
    category: '考试内容',
  },
  {
    id: '3',
    question: '学校招收艺术特长生的条件是什么？',
    answer: '艺术特长生需要在音乐、美术或舞蹈等艺术领域有突出表现，获得过市级以上比赛奖项，同时文化课成绩需达到一定水平。申请者需参加学校组织的专业测试和文化课测试。',
    category: '报名条件',
  },
  {
    id: '4',
    question: '国际班的学费是多少？',
    answer: '国际班的学费为每学年6.8万元，包含课程费用、教材费和部分国际交流活动费用。食宿费用需另行缴纳。具体收费标准以录取通知为准。',
    category: '缴费事项',
  },
  {
    id: '5',
    question: '学校提供住宿吗？住宿条件如何？',
    answer: '学校提供住宿，宿舍为4-6人间，配备空调、独立卫浴、书桌、储物柜等设施。住宿费为1200元/学期。由于宿位有限，优先安排远距离通勤的学生。',
    category: '其他',
  },
  {
    id: '6',
    question: '如何查询录取结果？',
    answer: '录取结果将在学校官网"招生录取"栏目公布，同时会通过短信通知考生。考生也可以凭准考证号和身份证号在招生系统中查询个人录取结果。',
    category: '录取政策',
  },
  {
    id: '7',
    question: '学校有哪些奖学金政策？',
    answer: '学校设有多种奖学金，包括新生入学奖学金、学业优秀奖学金、综合表现奖学金等。其中，中考成绩位列全市前100名的新生可获得一等新生奖学金10000元。详细奖学金评定标准可在学校官网查询。',
    category: '其他',
  },
  {
    id: '8',
    question: '转学生如何申请入学？',
    answer: '学校接受转学申请，但需根据年级和班级的实际情况决定是否有名额。转学生需提供原就读学校的学习成绩单、操行评语，并参加我校组织的水平测试。具体转学流程请联系学校教务处。',
    category: '报名条件',
  },
  {
    id: '9',
    question: '学校是否组织校园开放日活动？',
    answer: '是的，学校每年春季会组织1-2次校园开放日活动，邀请prospective学生和家长参观校园，了解学校的教育理念、课程设置、教师团队等。具体开放日安排会在学校官网和微信公众号提前公布。',
    category: '其他',
  },
  {
    id: '10',
    question: '高中部的课程设置有哪些特色？',
    answer: '我校高中部课程除了开设国家规定的基础课程外，还提供多样化的选修课程，包括STEAM课程、人文社科拓展、艺术课程、体育选项等。此外，学校还与高校合作开设大学先修课程，为学生升学做好准备。',
    category: '其他',
  },
];

// 招生宣传资料样本数据
export const admissionMaterials: AdmissionMaterial[] = [
  {
    id: '1',
    title: '2024年建设中学招生简章',
    type: '宣传册',
    description: '详细介绍学校的办学理念、师资力量、课程特色、招生政策等信息',
    thumbnailUrl: '/admission/materials/brochure-cover.jpg',
    fileUrl: '/admission/materials/brochure-2024.pdf',
    fileSize: '8.5MB',
    year: '2024',
  },
  {
    id: '2',
    title: '校园环境与设施介绍',
    type: '图片',
    description: '学校各个功能区域和教学设施的高清图片集，展示现代化的校园环境',
    thumbnailUrl: '/admission/materials/campus-thumb.jpg',
    fileUrl: '/admission/materials/campus-gallery.zip',
    fileSize: '25MB',
    year: '2024',
  },
  {
    id: '3',
    title: '建设中学宣传片',
    type: '视频',
    description: '5分钟高清宣传片，全方位展示学校特色和学生风采',
    thumbnailUrl: '/admission/materials/video-thumb.jpg',
    fileUrl: '/admission/materials/school-promo.mp4',
    fileSize: '120MB',
    year: '2024',
  },
  {
    id: '4',
    title: '国际班课程介绍',
    type: '文档',
    description: '详细介绍国际班的课程体系、师资配置、升学情况等信息',
    thumbnailUrl: '/admission/materials/international-thumb.jpg',
    fileUrl: '/admission/materials/international-program.pdf',
    fileSize: '5.2MB',
    year: '2024',
  },
  {
    id: '5',
    title: '2023年校园开放日回顾',
    type: '视频',
    description: '记录2023年校园开放日活动的精彩瞬间和家长学生反馈',
    thumbnailUrl: '/admission/materials/openday-thumb.jpg',
    fileUrl: '/admission/materials/openday-2023.mp4',
    fileSize: '85MB',
    year: '2023',
  },
];

// 辅助函数

// 获取所有招生年份
export const getAllYears = (): AdmissionYear[] => {
  return ['2024', '2023', '2022', '2021', '2020'];
};

// 获取所有招生类型
export const getAllTypes = (): AdmissionType[] => {
  return ['小升初', '初升高', '国际班', '艺术特长生', '体育特长生'];
};

// 根据年份和类型获取招生计划
export const getPlansByYearAndType = (year?: AdmissionYear, type?: AdmissionType): AdmissionPlan[] => {
  let filteredPlans = [...admissionPlans];
  
  if (year) {
    filteredPlans = filteredPlans.filter(plan => plan.year === year);
  }
  
  if (type) {
    filteredPlans = filteredPlans.filter(plan => plan.type === type);
  }
  
  return filteredPlans;
};

// 获取特定年份和类型的考试安排
export const getExamSchedule = (year: AdmissionYear, type: AdmissionType): ExamSchedule | undefined => {
  return examSchedules.find(schedule => schedule.year === year && schedule.type === type);
};

// 获取特定年份和类型的录取分数线
export const getAdmissionScore = (year: AdmissionYear, type: AdmissionType): AdmissionScore | undefined => {
  return admissionScores.find(score => score.year === year && score.type === type);
};

// 根据年份和类型获取招生公告
export const getNoticesByYearAndType = (year?: AdmissionYear, type?: AdmissionType): AdmissionNotice[] => {
  let filteredNotices = [...admissionNotices];
  
  if (year) {
    filteredNotices = filteredNotices.filter(notice => notice.year === year);
  }
  
  if (type) {
    filteredNotices = filteredNotices.filter(notice => notice.type === type);
  }
  
  return filteredNotices.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

// 根据年份和类型获取招生政策
export const getPoliciesByYearAndType = (year?: AdmissionYear, type?: AdmissionType): AdmissionPolicy[] => {
  let filteredPolicies = [...admissionPolicies];
  
  if (year) {
    filteredPolicies = filteredPolicies.filter(policy => policy.year === year);
  }
  
  if (type) {
    filteredPolicies = filteredPolicies.filter(policy => policy.type === type);
  }
  
  return filteredPolicies.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
};

// 根据类别获取招生问答
export const getFAQsByCategory = (category?: AdmissionFAQ['category']): AdmissionFAQ[] => {
  if (!category) {
    return admissionFAQs;
  }
  return admissionFAQs.filter(faq => faq.category === category);
};

// 根据年份获取招生宣传资料
export const getMaterialsByYear = (year: AdmissionYear): AdmissionMaterial[] => {
  return admissionMaterials.filter(material => material.year === year);
};

// 根据slug获取招生公告
export const getNoticeBySlug = (slug: string): AdmissionNotice | undefined => {
  return admissionNotices.find(notice => notice.slug === slug);
};

// 根据slug获取招生政策
export const getPolicyBySlug = (slug: string): AdmissionPolicy | undefined => {
  return admissionPolicies.find(policy => policy.slug === slug);
}; 