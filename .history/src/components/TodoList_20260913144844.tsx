import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Pet, TodoItem } from '../types/interfaces';

type TaskRowProps = {
  task: TodoItem;
  completed: boolean;
  onToggle: () => void;
  pet: Pet;
};

function TaskRow({ task, completed, onToggle }: TaskRowProps) {
  return (
    <TouchableOpacity
      accessibilityRole="checkbox"
      accessibilityState={{ checked: completed }}
      activeOpacity={0.72}
      style={[
        styles.taskRowBase,
        completed ? styles.taskRowCompleted : styles.taskRowPending,
      ]}
      onPress={onToggle}
    >
      <View
        style={[
          styles.iconWrapperBase,
          completed ? styles.iconWrapperCompleted : styles.iconWrapperPending,
        ]}
      >
        <Ionicons
          name={task.icon as keyof typeof Ionicons.glyphMap}
          size={20}
          color={completed ? '#A3D9C9' : '#185A43'}
        />
      </View>
      <Text
        style={[
          styles.taskTextBase,
          completed ? styles.taskTextCompleted : styles.taskTextPending,
        ]}
      >
        {task.label}
      </Text>
      <View
        style={[
          styles.checkboxBase,
          completed ? styles.checkboxCompleted : styles.checkboxPending,
        ]}
      >
        {completed ? (
          <Ionicons name="checkmark" size={16} color="#A3D9C9" />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

function TaskSection({
  title,
  icon,
  tasks,
  completedTasks,
  onToggle,
}: {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  tasks: TodoItem[];
  completedTasks: Record<string, boolean>;
  onToggle: (taskId: string) => void;
}) {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrapper}>
          <Ionicons name={icon} size={16} color="#185A43" />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          completed={Boolean(completedTasks[task.id])}
          onToggle={() => onToggle(task.id)}
        />
      ))}
    </View>
  );
}

export default function TodoList({ tasks }: { tasks: TodoItem[] }) {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  
  const toggleTask = (taskId: string) =>
    setCompletedTasks((current) => ({ ...current, [taskId]: !current[taskId] }));
    
  const clinical = tasks.filter((task) => task.category === 'clinical');
  const preventive = tasks.filter((task) => task.category === 'preventive');
  const completedCount = Object.values(completedTasks).filter(Boolean).length;

  return (
    <View style={styles.listContainer}>
      <View style={styles.listHeader}>
        <View>
          <Text style={styles.listTitle}>Cuidados de hoje</Text>
          <Text style={styles.listSubtitle}>Pequenos cuidados, mais saúde para o {pet.nome}</Text>
        </View>
        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {completedCount}/{tasks.length}
          </Text>
        </View>
      </View>
      
      <TaskSection
        title="💊 Tratamento Prescrito"
        icon="medkit-outline"
        tasks={clinical}
        completedTasks={completedTasks}
        onToggle={toggleTask}
      />
      <TaskSection
        title="🌿 Rotina Preventiva"
        icon="paw-outline"
        tasks={preventive}
        completedTasks={completedTasks}
        onToggle={toggleTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // TodoListCuidados Styles
  listContainer: {
    marginHorizontal: 20,
    marginTop: 36,
    borderTopWidth: 1,
    borderTopColor: 'rgba(126, 159, 142, 0.2)',
    paddingTop: 28,
  },
  listHeader: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#185A43',
  },
  listSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#7E9F8E',
  },
  counterBadge: {
    borderRadius: 999,
    backgroundColor: '#185A43',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#A3D9C9',
  },

  // TaskSection Styles
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIconWrapper: {
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    backgroundColor: 'rgba(163, 217, 201, 0.45)',
  },
  sectionTitle: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#185A43',
  },

  // TaskRow Styles
  taskRowBase: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  taskRowCompleted: {
    borderColor: '#185A43',
    backgroundColor: '#A3D9C9',
  },
  taskRowPending: {
    borderColor: 'rgba(126, 159, 142, 0.25)',
    backgroundColor: '#FFFFFF',
  },
  
  iconWrapperBase: {
    marginRight: 12,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  iconWrapperCompleted: {
    backgroundColor: '#185A43',
  },
  iconWrapperPending: {
    backgroundColor: 'rgba(163, 217, 201, 0.45)',
  },
  
  taskTextBase: {
    flex: 1,
    paddingRight: 12,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  taskTextCompleted: {
    color: 'rgba(24, 90, 67, 0.6)',
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskTextPending: {
    color: '#185A43',
  },
  
  checkboxBase: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
  },
  checkboxCompleted: {
    borderColor: '#185A43',
    backgroundColor: '#185A43',
  },
  checkboxPending: {
    borderColor: '#7E9F8E',
    backgroundColor: 'transparent',
  },
});