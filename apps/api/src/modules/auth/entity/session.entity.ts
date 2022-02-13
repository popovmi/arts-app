import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AppSessionData } from '../interfaces/session-data.interface';

@Entity()
export class Session {
  @PrimaryColumn('uuid')
  sid: string;

  @Column({ type: 'jsonb' })
  sess: AppSessionData;

  @Column({ type: 'timestamp' })
  expire: Date;
}
