interface Lesson {
  id: number;
  title: string;
  description: string;
  video_url: string;
  article: string;
  order: number;
  with_ai: boolean;
  module_id: number;
  created_at: number;
  updated_at: number;
}
export default Lesson;
