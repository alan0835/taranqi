// 教学成果类型定义
export type AchievementCategory = '教师荣誉' | '学生荣誉' | '学校荣誉' | '科研成果' | '特色项目';

// 教学成果级别
export type AchievementLevel = '国家级' | '省级' | '市级' | '区级' | '校级';

// 附件类型
interface Attachment {
  name: string;
  url: string;
  size: string; // 如 "2.5MB"
}

// 教学成果数据接口
export interface Achievement {
  id: string;
  title: string;
  slug: string;
  category: AchievementCategory;
  level: AchievementLevel;
  date: string;
  summary: string;
  content: string;
  coverImage: string;
  participants?: string[]; // 参与者（教师或学生）
  departments?: string[]; // 相关部门
  awards?: string; // 获得的奖项
  recognizedBy?: string; // 颁发机构
  published?: boolean; // 是否已发布
  featured?: boolean; // 是否为特色成果（用于首页展示）
  relatedNews?: string[]; // 相关新闻文章的ID
  gallery?: string[]; // 相关图片
  attachments?: Attachment[]; // 相关附件
}

// 教学成果数据
export const allAchievements: Achievement[] = [
  {
    id: '1',
    title: '全国青少年科技创新大赛一等奖',
    slug: 'national-youth-science-innovation-competition',
    category: '学生荣誉',
    level: '国家级',
    date: '2023-08-15',
    summary: '我校学生李明、张华在第38届全国青少年科技创新大赛中荣获一等奖，项目《基于人工智能的水质监测系统》得到专家一致好评。',
    content: `
# 全国青少年科技创新大赛一等奖

我校学生李明、张华在第38届全国青少年科技创新大赛中荣获一等奖，这是我校学生首次在该项赛事中获得国家级一等奖。

## 获奖项目介绍

项目《基于人工智能的水质监测系统》创新性地将人工智能技术应用于水质监测领域，具有以下特点：

1. 采用深度学习算法，通过图像识别技术快速检测水体中的有害物质
2. 设计了低成本、便携式的监测设备，适用于野外环境
3. 开发了移动端应用，可实时上传监测数据并进行分析预警
4. 构建了水质数据开放平台，促进数据共享和研究交流

## 指导老师

本项目由我校物理组王刚老师和化学组李红老师共同指导，历时一年完成。两位老师在项目构思、技术实现和论文撰写方面给予了全方位指导。

## 获奖意义

本次获奖不仅是对学生科技创新能力的肯定，也展示了我校在STEAM教育方面的突出成果。学校将以此为契机，进一步加强创新教育，培养具有科学精神和创新意识的新时代人才。
    `,
    coverImage: '/achievements/science-competition.jpg',
    participants: ['李明', '张华'],
    departments: ['物理组', '化学组'],
    awards: '全国青少年科技创新大赛一等奖',
    recognizedBy: '中国科协、教育部、科技部、环境保护部等',
    featured: true,
    gallery: [
      '/achievements/science-competition-1.jpg',
      '/achievements/science-competition-2.jpg',
      '/achievements/science-competition-3.jpg',
    ],
    attachments: [
      {
        name: '获奖证书.pdf',
        url: '/attachments/science-competition-certificate.pdf',
        size: '1.2MB',
      },
      {
        name: '项目论文.pdf',
        url: '/attachments/science-competition-paper.pdf',
        size: '3.5MB',
      },
    ],
  },
  {
    id: '2',
    title: '全国模范教师称号',
    slug: 'national-model-teacher',
    category: '教师荣誉',
    level: '国家级',
    date: '2023-09-10',
    summary: '我校数学组张伟老师被授予"全国模范教师"荣誉称号，表彰其在教育教学改革和人才培养方面的突出贡献。',
    content: `
# 全国模范教师称号

我校数学组张伟老师被教育部授予"全国模范教师"荣誉称号，这是对他20年教学生涯的最高肯定。

## 个人简介

张伟老师，特级教师，数学教研组组长，从教20年来一直工作在教学一线。他坚持"以学生为中心"的教学理念，不断探索数学教学方法改革，开发了多套适合不同学习能力学生的教学材料。

## 主要成就

1. 主持省级课题3项，市级课题5项，发表教学论文15篇
2. 指导学生参加全国、省市各级数学竞赛，获奖学生累计超过100人次
3. 编写《高中数学思维方法训练》等教辅材料，被多所学校采用
4. 开发"数学思维可视化"教学法，提高学生抽象思维能力
5. 多次受邀在全国性教育教学研讨会上作经验分享

## 教育理念

张伟老师认为："数学教育不仅是传授知识，更是培养思维。每个学生都有学好数学的潜力，关键是找到适合他们的方法。"他致力于将抽象的数学概念具象化，让学生在理解的基础上掌握知识，培养解决问题的能力。

## 获奖感言

"这个荣誉属于建设中学全体师生。是学校的平台和同事们的支持让我能够专注教学研究，是学生们的信任让我有动力不断进步。教育是一场长跑，我会继续努力，为培养更多人才贡献力量。"
    `,
    coverImage: '/achievements/model-teacher.jpg',
    participants: ['张伟'],
    departments: ['数学组'],
    awards: '全国模范教师',
    recognizedBy: '教育部',
    featured: true,
  },
  {
    id: '3',
    title: '全国文明校园',
    slug: 'national-civilized-campus',
    category: '学校荣誉',
    level: '国家级',
    date: '2022-12-05',
    summary: '我校被评为"全国文明校园"，这是对学校在精神文明建设方面工作的充分肯定，也是学校综合实力的重要体现。',
    content: `
# 全国文明校园

在全国文明校园评选活动中，经过层层审核和实地考察，我校成功入选"全国文明校园"，这是学校建校以来获得的最高级别综合性荣誉之一。

## 评选标准

全国文明校园评选标准严格，主要从以下几个方面进行考核：

1. 领导班子建设与思想道德教育
2. 校园文化建设与活动开展
3. 教师队伍建设与师德师风
4. 校园环境建设与管理
5. 安全文明和谐校园创建成效
6. 学生思想品德与行为习惯养成

## 创建历程

学校自2018年启动创建工作，经过四年不懈努力，在各个方面取得了显著进步：

- 建立健全德育工作体系，形成"知行合一"的德育特色
- 开展丰富多彩的校园文化活动，培养学生艺术素养和创新能力
- 实施"师德师风建设工程"，提升教师职业道德和教学能力
- 改造升级校园环境，建设智慧校园和绿色校园
- 完善安全管理制度，确保校园安全稳定

## 荣誉意义

获评"全国文明校园"不仅是对学校过去工作的肯定，更是对未来发展的鞭策。学校将以此为新起点，继续深化教育教学改革，推进素质教育，提升办学水平，为培养德智体美劳全面发展的社会主义建设者和接班人作出更大贡献。
    `,
    coverImage: '/achievements/civilized-campus.jpg',
    awards: '全国文明校园',
    recognizedBy: '中央文明委',
    featured: true,
    gallery: [
      '/achievements/civilized-campus-1.jpg',
      '/achievements/civilized-campus-2.jpg',
    ],
  },
  {
    id: '4',
    title: '省级教学成果特等奖',
    slug: 'provincial-teaching-achievement',
    category: '科研成果',
    level: '省级',
    date: '2023-05-20',
    summary: '我校"基于学科核心素养的高中课堂教学模式研究"项目荣获省级教学成果特等奖，该项目历时三年，全校教师积极参与。',
    content: `
# 省级教学成果特等奖

我校"基于学科核心素养的高中课堂教学模式研究"项目在省级教学成果评选中脱颖而出，荣获特等奖。这是我校教育教学改革的重大突破，也是教师集体智慧的结晶。

## 项目背景

随着新课程改革的深入推进，学科核心素养已成为衡量学生学习质量的重要标准。如何在日常教学中有效培养学生的学科核心素养，是摆在每位教师面前的现实课题。我校于2020年启动该研究项目，旨在探索适合新时代的高效课堂教学模式。

## 研究内容

项目主要围绕以下方面开展研究：

1. 学科核心素养的内涵解读与具体化
2. 基于核心素养的教学目标设计与实施策略
3. 学科特色的教学模式构建与优化
4. 多元评价体系的建立与应用
5. 教师专业能力提升的有效路径

## 主要成果

经过三年的实践探索，项目形成了系列成果：

- 构建了"问题引领、自主探究、协作交流、反思提升"的教学模式
- 开发了9个学科的核心素养导向教学案例库，共计300余节
- 编写《基于核心素养的高中课堂教学指南》一书，由教育科学出版社出版
- 形成20余篇高质量研究论文，其中5篇发表在CSSCI期刊
- 建立了"学科核心素养评价体系"，为教学质量监测提供了有效工具

## 推广应用

研究成果已在全省30余所学校推广应用，取得了良好效果：学生学习兴趣明显提高，思维能力显著增强，学科成绩整体提升，教师教学能力普遍提高。
    `,
    coverImage: '/achievements/teaching-research.jpg',
    departments: ['全体教研组'],
    awards: '省级教学成果特等奖',
    recognizedBy: '省教育厅',
    gallery: [
      '/achievements/teaching-research-1.jpg',
      '/achievements/teaching-research-2.jpg',
    ],
    attachments: [
      {
        name: '研究报告.pdf',
        url: '/attachments/teaching-research-report.pdf',
        size: '5.7MB',
      },
    ],
  },
  {
    id: '5',
    title: '市级创新实验室建设',
    slug: 'city-innovation-laboratory',
    category: '特色项目',
    level: '市级',
    date: '2023-03-10',
    summary: '我校获批市级重点建设项目，投资500万元建设"未来技术创新实验室"，涵盖人工智能、机器人、虚拟现实等前沿技术领域。',
    content: `
# 市级创新实验室建设

我校获批市级重点建设项目，投资500万元建设"未来技术创新实验室"，该实验室已于2023年3月正式投入使用，成为培养学生科技创新能力的重要平台。

## 实验室规划

未来技术创新实验室总面积达800平方米，分为以下功能区：

1. **AI人工智能实验区**：配备深度学习工作站、智能机器人开发平台等
2. **虚拟现实体验区**：设有VR/AR开发设备、交互式沉浸体验系统等
3. **创客空间**：提供3D打印机、激光切割机、各类电子元器件等
4. **智能物联网区**：配置各类传感器、开发板和测试设备
5. **项目展示区**：展示学生优秀创新成果，提供交流分享空间

## 教育理念

创新实验室秉持"激发兴趣、培养能力、引领创新"的理念，以项目式学习为主要方式，鼓励学生跨学科思考和实践，培养创新精神和实践能力。

## 课程体系

围绕实验室建设，学校开发了系列特色课程：

- 《人工智能基础》（必修）
- 《机器人设计与编程》（选修）
- 《虚拟现实应用开发》（选修）
- 《创客实践》（选修）
- 《科技创新项目研究》（选修）

这些课程既可作为校本课程纳入正常教学计划，也可作为社团活动和兴趣小组的内容。

## 初步成效

实验室投入使用半年来，已取得明显成效：

- 200余名学生参与各类创新项目研究
- 组建15个创新兴趣小组，覆盖不同年级和专业方向
- 学生在市级科技创新大赛中获奖10项
- 申请实用新型专利3项
- 与5所高校建立合作关系，开展科研指导和资源共享

## 未来展望

未来，学校将进一步完善实验室功能，拓展应用领域，加强与企业、高校的合作，打造具有示范作用的中学创新教育基地，为培养创新型人才提供有力支持。
    `,
    coverImage: '/achievements/innovation-lab.jpg',
    departments: ['信息技术组', '物理组'],
    awards: '市级重点建设项目',
    recognizedBy: '市教育局、市科技局',
    gallery: [
      '/achievements/innovation-lab-1.jpg',
      '/achievements/innovation-lab-2.jpg',
      '/achievements/innovation-lab-3.jpg',
    ],
  },
  {
    id: '6',
    title: '学生合唱团市赛一等奖',
    slug: 'student-choir-first-prize',
    category: '学生荣誉',
    level: '市级',
    date: '2023-06-05',
    summary: '我校学生合唱团在市第十五届中学生艺术节比赛中荣获合唱比赛一等奖，以高水平的艺术表现力展示了我校艺术教育成果。',
    content: `
# 学生合唱团市赛一等奖

我校学生合唱团在市第十五届中学生艺术节比赛中荣获合唱比赛一等奖，这是对我校艺术教育工作的高度肯定。

## 参赛情况

本次比赛共有全市42所中学参加，分为初中组和高中组。我校合唱团由40名学生组成，表演了两首作品：

1. 中国民歌改编曲《茉莉花》
2. 现代合唱作品《追寻》（原创）

评委一致认为，我校合唱团音色纯净、声部平衡、情感表达丰富，尤其是原创作品《追寻》展现了当代青少年积极向上的精神风貌，艺术感染力强。

## 指导教师

本次比赛由音乐组王丽老师和赵明老师共同指导。两位老师从选曲、编排到声部训练、舞台表现都付出了巨大心血，每周坚持三次训练，历时两个月完成了全部准备工作。

## 合唱团简介

我校学生合唱团成立于2015年，是学校重点艺术团队之一。合唱团秉持"以美育人"的理念，注重培养学生的音乐素养和团队协作精神。多年来，合唱团已发展成为一支具有较高水平的学生艺术团体，曾多次在各级比赛中获奖。

## 艺术教育成果

此次获奖是我校艺术教育成果的集中展示。近年来，学校高度重视艺术教育，将其作为素质教育的重要组成部分：

- 开设丰富多样的艺术课程和社团活动
- 定期举办校园艺术节、音乐会等活动
- 邀请专业艺术家进校园开展讲座和工作坊
- 组织学生参观艺术展览、观看高水平演出

通过系统化的艺术教育，培养了学生的审美能力和人文素养，促进了全面发展。
    `,
    coverImage: '/achievements/student-choir.jpg',
    participants: ['学生合唱团成员'],
    departments: ['音乐组'],
    awards: '市中学生艺术节合唱比赛一等奖',
    recognizedBy: '市教育局、市文化局',
    gallery: [
      '/achievements/student-choir-1.jpg',
      '/achievements/student-choir-2.jpg',
    ],
  },
  {
    id: '7',
    title: '教育部课题研究重大成果',
    slug: 'ministry-of-education-research-achievement',
    category: '科研成果',
    level: '国家级',
    date: '2023-10-25',
    summary: '我校主持的教育部"十四五"规划课题《信息化环境下高中生核心素养培养的实践研究》顺利结题，成果获评"优秀"。',
    content: `
# 教育部课题研究重大成果

我校主持的教育部"十四五"规划课题《信息化环境下高中生核心素养培养的实践研究》经过三年研究，于近日顺利结题，成果获评"优秀"。

## 课题概况

**课题名称**：信息化环境下高中生核心素养培养的实践研究
**批准文号**：教基[2020]15号
**课题级别**：教育部"十四五"规划课题
**起止时间**：2020年9月-2023年9月
**主持单位**：建设中学
**课题负责人**：李强（校长）

## 研究内容

课题主要研究了信息技术与学科教学深度融合背景下，如何有效培养高中生的核心素养。研究内容包括：

1. 信息化环境对高中生核心素养培养的影响机制
2. 基于信息技术的学科教学模式创新
3. 信息化环境下学生自主学习能力培养策略
4. 数字资源开发与应用的有效路径
5. 信息化教学评价体系构建

## 研究方法

课题采用了多种研究方法：

- 文献研究法：梳理国内外相关研究成果
- 行动研究法：在教学实践中不断调整优化策略
- 案例分析法：提炼典型教学案例，分析成功经验
- 问卷调查法：收集师生对信息化教学的反馈
- 对比实验法：设置实验组和对照组，验证教学效果

## 主要成果

经过三年研究，课题形成了丰富的理论和实践成果：

1. **理论成果**：提出了"信息化环境下高中生核心素养培养的'三维四层'模型"，为学科教学提供了理论框架
2. **实践成果**：开发了12个学科的信息化教学案例库，包含200余节示范课
3. **资源成果**：建设了校级数字资源平台，汇集各类教学资源5000余条
4. **制度成果**：形成了《信息化教学常规》《数字资源建设规范》等制度文件
5. **推广成果**：在全国范围内开展了10场示范课展示活动，培训教师500余人

## 成果推广

课题成果已在本市20所学校进行推广应用，并通过教育部基础教育课程教材发展中心的平台在全国范围内分享。多家教育媒体对课题成果进行了报道，产生了广泛的社会影响。

## 意义价值

该课题研究成果对推动信息技术与教育教学深度融合，提升学校信息化教学水平，培养学生适应未来社会的核心素养具有重要意义。课题组将继续深化研究，推动成果转化应用，为教育信息化发展贡献力量。
    `,
    coverImage: '/achievements/education-research.jpg',
    departments: ['全体教研组'],
    awards: '教育部"十四五"规划课题优秀成果',
    recognizedBy: '教育部基础教育课程教材发展中心',
    featured: true,
    attachments: [
      {
        name: '结题报告.pdf',
        url: '/attachments/education-research-report.pdf',
        size: '4.3MB',
      },
      {
        name: '研究论文集.pdf',
        url: '/attachments/education-research-papers.pdf',
        size: '8.2MB',
      },
    ],
  },
  {
    id: '8',
    title: '全国奥林匹克物理竞赛团体冠军',
    slug: 'physics-olympiad-team-champion',
    category: '学生荣誉',
    level: '国家级',
    date: '2023-11-15',
    summary: '我校代表队在第40届全国中学生物理奥林匹克竞赛中获得团体冠军，5名队员全部获得一等奖，创造了学校参赛历史最好成绩。',
    content: `
# 全国奥林匹克物理竞赛团体冠军

我校代表队在第40届全国中学生物理奥林匹克竞赛中获得团体冠军，这是学校在该项赛事中取得的历史最好成绩。

## 竞赛概况

本届全国中学生物理奥林匹克竞赛共有来自全国各省市自治区的320所学校、1600余名选手参赛。经过激烈角逐，我校代表队凭借出色表现，最终获得团体冠军，5名队员全部获得一等奖，其中队长王磊同学获得个人全国第二名的优异成绩。

## 参赛队员

我校参赛队员及获奖情况：

| 姓名 | 年级 | 个人名次 | 奖项 |
|------|------|----------|------|
| 王磊 | 高三 | 全国第2名 | 一等奖 |
| 陈明 | 高三 | 全国第8名 | 一等奖 |
| 赵琳 | 高三 | 全国第15名 | 一等奖 |
| 黄强 | 高二 | 全国第22名 | 一等奖 |
| 刘洋 | 高二 | 全国第35名 | 一等奖 |

## 培养机制

我校物理奥赛队有着完善的培养机制：

1. **层层选拔**：通过校内选拔、强化训练、模拟比赛等环节，遴选最优秀的学生组成校队
2. **导师制度**：每名队员配备一名指导教师，进行一对一指导
3. **理论实验并重**：注重理论与实验能力的均衡发展，每周安排理论学习和实验训练
4. **暑期集训**：每年暑假开展为期三周的集中训练
5. **高校合作**：与北京大学物理系建立合作关系，定期邀请大学教授进行专题讲座

## 指导团队

我校物理竞赛指导团队由物理组多位经验丰富的教师组成，主教练张强老师是国家级物理奥赛教练，有15年的竞赛指导经验。团队成员分工协作，共同为队员提供全方位的指导和支持。

## 获奖意义

本次获奖对我校物理教学和科学素养培养具有重要意义：

- 展示了学校在基础学科教育方面的实力
- 验证了学校物理特色培养模式的有效性
- 将激励更多学生投入基础科学学习和研究
- 为学校培养拔尖创新人才积累了宝贵经验

## 未来展望

学校将以此为契机，进一步完善学科竞赛培养体系，拓展到数学、化学、生物等更多学科，努力培养更多学科特长生，为国家基础科学人才培养贡献力量。
    `,
    coverImage: '/achievements/physics-olympiad.jpg',
    participants: ['王磊', '陈明', '赵琳', '黄强', '刘洋'],
    departments: ['物理组'],
    awards: '全国中学生物理奥林匹克竞赛团体冠军',
    recognizedBy: '中国物理学会、教育部',
    featured: true,
    gallery: [
      '/achievements/physics-olympiad-1.jpg',
      '/achievements/physics-olympiad-2.jpg',
    ],
  },
];

// 成果数据操作函数
export const getAllCategories = (): AchievementCategory[] => {
  return ['教师荣誉', '学生荣誉', '学校荣誉', '科研成果', '特色项目'];
};

export const getAllLevels = (): AchievementLevel[] => {
  return ['国家级', '省级', '市级', '区级', '校级'];
};

export const getAchievementsByCategory = (category: AchievementCategory): Achievement[] => {
  return allAchievements.filter(achievement => achievement.category === category);
};

export const getAchievementsByLevel = (level: AchievementLevel): Achievement[] => {
  return allAchievements.filter(achievement => achievement.level === level);
};

export const getAchievementBySlug = (slug: string): Achievement | undefined => {
  return allAchievements.find(achievement => achievement.slug === slug);
};

export const getFeaturedAchievements = (count: number = 3): Achievement[] => {
  return allAchievements
    .filter(achievement => achievement.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getLatestAchievements = (count: number = 5): Achievement[] => {
  return [...allAchievements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const countAchievementsByCategory = (): Record<AchievementCategory, number> => {
  const counts: Partial<Record<AchievementCategory, number>> = {};
  
  getAllCategories().forEach(category => {
    counts[category] = allAchievements.filter(a => a.category === category).length;
  });
  
  return counts as Record<AchievementCategory, number>;
};

export const countAchievementsByLevel = (): Record<AchievementLevel, number> => {
  const counts: Partial<Record<AchievementLevel, number>> = {};
  
  getAllLevels().forEach(level => {
    counts[level] = allAchievements.filter(a => a.level === level).length;
  });
  
  return counts as Record<AchievementLevel, number>;
}; 