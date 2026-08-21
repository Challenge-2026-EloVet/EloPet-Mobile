import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { TodoItem } from '../types';

type TaskRowProps = {
  task: TodoItem;
  completed: boolean;
  onToggle: () => void;
};

function TaskRow({ task, completed, onToggle }: TaskRowProps) {
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      activeOpacity={0.72}
      className={`mb-3 flex-row items-center rounded-2xl border p-4 ${completed ? 'border-[#185A43] bg-[#A3D9C9]' : 'border-[#7E9F8E]/25 bg-white'}`}
      onPress={onToggle}
    >
      <View className={`mr-3 h-10 w-10 items-center justify-center rounded-xl ${completed ? 'bg-[#185A43]' : 'bg-[#A3D9C9]/45'}`}>
        <Ionicons name={task.icon} size={20} color={completed ? '#A3D9C9' : '#185A43'} />
      </View>
      <Text className={`flex-1 pr-3 text-sm font-semibold leading-5 ${completed ? 'text-[#185A43]/60 line-through opacity-70' : 'text-[#185A43]'}`}>
        {task.label}
      </Text>
      <View className={`h-6 w-6 items-center justify-center rounded-lg border-2 ${completed ? 'border-[#185A43] bg-[#185A43]' : 'border-[#7E9F8E] bg-transparent'}`}>
        {completed ? <Ionicons name="checkmark" size={16} color="#A3D9C9" /> : null}
      </View>
    </TouchableOpacity>
  );
}

function TaskSection({ title, icon, tasks, completedTasks, onToggle }: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  tasks: TodoItem[];
  completedTasks: Record<string, boolean>;
  onToggle: (taskId: string) => void;
}) {
  return (
    <View className="mb-5">
      <View className="mb-3 flex-row items-center">
        <View className="h-8 w-8 items-center justify-center rounded-xl bg-[#A3D9C9]/45">
          <Ionicons name={icon} size={16} color="#185A43" />
        </View>
        <Text className="ml-2 text-sm font-bold text-[#185A43]">{title}</Text>
      </View>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} completed={Boolean(completedTasks[task.id])} onToggle={() => onToggle(task.id)} />
      ))}
    </View>
  );
}

export default function TodoListCuidados({ tasks }: { tasks: TodoItem[] }) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const toggleTask = (taskId: string) => setCompletedTasks((current) => ({ ...current, [taskId]: !current[taskId] }));
  const clinical = tasks.filter((task) => task.category === 'clinical');
  const preventive = tasks.filter((task) => task.category === 'preventive');
  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  return (
    <View className="mx-5 mt-9 border-t border-[#7E9F8E]/20 pt-7">
      <View className="mb-6 flex-row items-end justify-between">
        <View>
          <Text className="text-xl font-bold text-[#185A43]">Cuidados de hoje</Text>
          <Text className="mt-1 text-sm text-[#7E9F8E]">Pequenos cuidados, mais saúde para o Thor</Text>
        </View>
        <View className="rounded-full bg-[#185A43] px-3 py-1.5">
          <Text className="text-xs font-bold text-[#A3D9C9]">{completedCount}/{tasks.length}</Text>
        </View>
      </View>
      <TaskSection title="💊 Tratamento Prescrito" icon="medkit-outline" tasks={clinical} completedTasks={completedTasks} onToggle={toggleTask} />
      <TaskSection title="🌿 Rotina Preventiva" icon="paw-outline" tasks={preventive} completedTasks={completedTasks} onToggle={toggleTask} />
    </View>
  );
}