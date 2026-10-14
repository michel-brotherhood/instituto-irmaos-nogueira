/**
 * Gera o "PIX Copia e Cola" (BR Code estático, padrão EMV/BCB) e o QR Code em SVG.
 * Referência: Manual de Padrões para Iniciação do Pix (BCB).
 */
import QRCode from 'qrcode';

const field = (id: string, value: string) => `${id}${String(value.length).padStart(2, '0')}${value}`;

/** CRC16-CCITT (poly 0x1021, init 0xFFFF), exigido no campo 63 do BR Code. */
function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
    crc &= 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

const normalize = (s: string, max: number) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^A-Za-z0-9 ]/g, '').toUpperCase().slice(0, max);

export interface PixOptions { key: string; name: string; city: string; amount?: number; txid?: string }

export function pixPayload({ key, name, city, amount, txid = '***' }: PixOptions): string {
  const account = field('00', 'br.gov.bcb.pix') + field('01', key);
  const parts = [
    field('00', '01'),
    field('26', account),
    field('52', '0000'),
    field('53', '986'),
    amount && amount > 0 ? field('54', amount.toFixed(2)) : '',
    field('58', 'BR'),
    field('59', normalize(name, 25)),
    field('60', normalize(city, 15)),
    field('62', field('05', txid)),
  ].join('');
  const toSign = `${parts}6304`;
  return toSign + crc16(toSign);
}

export function pixQrSvg(payload: string): Promise<string> {
  return QRCode.toString(payload, { type: 'svg', margin: 1, errorCorrectionLevel: 'M', color: { dark: '#141414', light: '#ffffff' } });
}

export async function copyText(text: string): Promise<boolean> {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok;
  }
}
