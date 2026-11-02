import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

const APPOINTMENT_CHANNEL_ID = 'appointment-reminders';
const APPOINTMENT_REMINDER_TYPE = 'appointment-reminder';
const REMINDER_ADVANCE_MS = 60 * 60 * 1000;

export type AppointmentReminder = {
  id: string;
  title: string;
  body: string;
};

function assertNotificationsAvailable() {
  if (Platform.OS === 'web') {
    throw new Error('Notificações locais estão disponíveis somente no aplicativo móvel.');
  }
}

export function parseAppointmentDate(dateText: string, timeText: string): Date | null {
  const dateMatch = dateText.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  const timeMatch = timeText.trim().match(/^(\d{2}):(\d{2})$/);

  if (!dateMatch || !timeMatch) return null;

  const [, dayText, monthText, yearText] = dateMatch;
  const [, hourText, minuteText] = timeMatch;
  const day = Number(dayText);
  const month = Number(monthText);
  const year = Number(yearText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const appointmentDate = new Date(year, month - 1, day, hour, minute);

  if (
    appointmentDate.getFullYear() !== year ||
    appointmentDate.getMonth() !== month - 1 ||
    appointmentDate.getDate() !== day ||
    appointmentDate.getHours() !== hour ||
    appointmentDate.getMinutes() !== minute
  ) {
    return null;
  }

  return appointmentDate;
}

async function prepareNotificationChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(APPOINTMENT_CHANNEL_ID, {
      name: 'Lembretes de consultas',
      description: 'Avisos sobre consultas veterinárias agendadas',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });
  }
}

export async function getNotificationPermissionStatus() {
  assertNotificationsAvailable();
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

export async function requestNotificationPermission() {
  assertNotificationsAvailable();
  await prepareNotificationChannel();

  const currentPermission = await Notifications.getPermissionsAsync();
  if (currentPermission.status === 'granted') return true;

  const requestedPermission = await Notifications.requestPermissionsAsync();
  return requestedPermission.status === 'granted';
}

export async function scheduleAppointmentReminder({
  appointmentDate,
  clinicName,
  specialty,
}: {
  appointmentDate: Date;
  clinicName: string;
  specialty: string;
}) {
  if (appointmentDate.getTime() <= Date.now()) {
    throw new Error('A consulta precisa estar marcada para uma data e horário futuros.');
  }

  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) return null;

  const oneHourBefore = new Date(appointmentDate.getTime() - REMINDER_ADVANCE_MS);
  const reminderDate = oneHourBefore.getTime() > Date.now() ? oneHourBefore : appointmentDate;
  const time = appointmentDate.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const identifier = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Lembrete de consulta veterinária',
      body: `Consulta de ${specialty} na ${clinicName}, às ${time}.`,
      sound: 'default',
      data: { type: APPOINTMENT_REMINDER_TYPE },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: reminderDate,
      ...(Platform.OS === 'android' ? { channelId: APPOINTMENT_CHANNEL_ID } : {}),
    },
  });

  return { identifier, reminderDate };
}

export async function getScheduledAppointmentReminders(): Promise<AppointmentReminder[]> {
  assertNotificationsAvailable();
  const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();

  return scheduledNotifications
    .filter((notification) => notification.content.data?.type === APPOINTMENT_REMINDER_TYPE)
    .map((notification) => ({
      id: notification.identifier,
      title: notification.content.title ?? 'Lembrete de consulta',
      body: notification.content.body ?? '',
    }));
}

export async function cancelScheduledAppointmentReminders() {
  const reminders = await getScheduledAppointmentReminders();
  await Promise.all(
    reminders.map(({ id }) => Notifications.cancelScheduledNotificationAsync(id))
  );
  return reminders.length;
}
