import { useState } from 'react';
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  isReviewSupported,
  openStoreReview,
  requestReview,
  type RequestReviewOptions,
} from '@acertijosapps/react-native-in-app-store-review';

// Ficha real de Insumia (AcertijosApps), usada solo por el fallback a la tienda.
const STORE_OPTIONS: RequestReviewOptions = {
  iosAppId: '6792440101',
  androidPackage: 'com.acertijos.insumia',
};

interface LogEntry {
  id: number;
  text: string;
  ok: boolean;
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <DemoScreen dark={isDarkMode} />
    </SafeAreaProvider>
  );
}

function DemoScreen({ dark }: { dark: boolean }) {
  const insets = useSafeAreaInsets();
  const [log, setLog] = useState<LogEntry[]>([]);
  const colors = dark ? darkColors : lightColors;

  const run = async (label: string, action: () => Promise<void>) => {
    const started = Date.now();
    let entry: Omit<LogEntry, 'id'>;
    try {
      await action();
      entry = { text: `${label} → resuelta (${Date.now() - started} ms)`, ok: true };
    } catch (error) {
      entry = { text: `${label} → error: ${String(error)}`, ok: false };
    }
    setLog((prev) => [{ id: started, ...entry }, ...prev].slice(0, 20));
  };

  const supported = isReviewSupported();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        In-app store review
      </Text>
      <Text style={[styles.subtitle, { color: colors.muted }]}>
        {Platform.OS === 'ios'
          ? 'iOS: en debug el prompt siempre aparece, con Enviar desactivado.'
          : 'Android: el diálogo solo aparece si la app se instaló desde Google Play.'}
      </Text>

      <View
        testID="support-status"
        style={[styles.status, { borderColor: supported ? colors.ok : colors.error }]}
      >
        <Text style={{ color: colors.text }}>
          isReviewSupported(): <Text style={styles.bold}>{String(supported)}</Text>
        </Text>
      </View>

      <DemoButton
        testID="request-review"
        label="requestReview()"
        colors={colors}
        onPress={() => run('requestReview()', () => requestReview(STORE_OPTIONS))}
      />
      <DemoButton
        testID="open-store-review"
        label="openStoreReview()"
        colors={colors}
        onPress={() =>
          run('openStoreReview()', () => openStoreReview(STORE_OPTIONS))
        }
      />

      <Text style={[styles.section, { color: colors.muted }]}>Resultados</Text>
      {log.length === 0 ? (
        <Text style={{ color: colors.muted }}>Todavía no hay llamadas.</Text>
      ) : (
        log.map((item) => (
          <Text
            key={item.id}
            style={[styles.logLine, { color: item.ok ? colors.text : colors.error }]}
          >
            {item.text}
          </Text>
        ))
      )}
    </ScrollView>
  );
}

function DemoButton({
  label,
  onPress,
  colors,
  testID,
}: {
  label: string;
  onPress: () => void;
  colors: typeof lightColors;
  testID: string;
}) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.accent, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const lightColors = {
  background: '#ffffff',
  text: '#111827',
  muted: '#6b7280',
  accent: '#2563eb',
  ok: '#16a34a',
  error: '#dc2626',
};

const darkColors: typeof lightColors = {
  background: '#0b0f17',
  text: '#f3f4f6',
  muted: '#9ca3af',
  accent: '#3b82f6',
  ok: '#22c55e',
  error: '#f87171',
};

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, gap: 12 },
  title: { fontSize: 26, fontWeight: '700' },
  subtitle: { fontSize: 14, lineHeight: 20 },
  status: { borderWidth: 1, borderRadius: 10, padding: 12, marginTop: 8 },
  bold: { fontWeight: '700' },
  button: { borderRadius: 10, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
  section: { marginTop: 16, fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  logLine: { fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }), fontSize: 13 },
});

export default App;
