import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { TopNavComponent } from 'src/core/components/top-nav/top-nav.component';


@UntilDestroy({ checkProperties: true })
@Component({
  standalone: true,
  imports: [TopNavComponent, RouterModule],
  selector: 'app-component',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent  {

}
