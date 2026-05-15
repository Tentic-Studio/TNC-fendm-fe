import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface PasswordField {
  id: string
  label: string
  show: boolean
  toggle: () => void
}

export default function ChangePasswordForm() {
  const [showCurrent,  setShowCurrent]  = useState(false)
  const [showNew,      setShowNew]      = useState(false)
  const [showConfirm,  setShowConfirm]  = useState(false)

  const fields: PasswordField[] = [
    { id: 'current', label: 'Password Saat Ini',       show: showCurrent,  toggle: () => setShowCurrent(v => !v)  },
    { id: 'new',     label: 'Password Baru',            show: showNew,      toggle: () => setShowNew(v => !v)      },
    { id: 'confirm', label: 'Konfirmasi Password Baru', show: showConfirm,  toggle: () => setShowConfirm(v => !v)  },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: connect to API
  }

  return (
    <div style={{
      background: 'white', border: '1px solid var(--fendm-border)',
      borderRadius: 12, padding: '20px 24px', maxWidth: 480,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--fendm-text-dark)', marginBottom: 20, letterSpacing: '0.2px' }}>
        Perbarui Password
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {fields.map(field => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Label
              htmlFor={field.id}
              style={{ fontSize: 12, fontWeight: 600, color: 'var(--fendm-text-dark)' }}
            >
              {field.label}
            </Label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={14}
                color="var(--fendm-text-muted)"
                style={{
                  position: 'absolute', left: 12, top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none', opacity: 0.55,
                }}
              />
              <Input
                id={field.id}
                type={field.show ? 'text' : 'password'}
                placeholder="••••••••"
                style={{ paddingLeft: 36, paddingRight: 40 }}
              />
              <button
                type="button"
                onClick={field.toggle}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--fendm-text-muted)', display: 'flex',
                  alignItems: 'center', opacity: 0.65,
                }}
              >
                {field.show ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        ))}

        <Button
          type="submit"
          style={{
            marginTop: 4, height: 40,
            background: 'var(--fendm-primary)',
            fontSize: 13, fontWeight: 600,
          }}
        >
          Simpan Password
        </Button>
      </form>
    </div>
  )
}
