import { Component } from '@angular/core';
import { Widget } from '@fem/api-interfaces';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  price;
  mode;
  widgets: Widget[];

  reCalculateTotal(mode: string, widgets: Widget[], widget: Widget): void {
    this.widgets = this.updateWidgets(mode, widgets, widget);
    this.price = this.getTotalPrice(this.widgets);
  }

  updateWidgets(mode: string, widgets: Widget[], widget: Widget): Widget[] {
    switch (mode) {
      case 'create':
        return this.addWidget(widgets, widget);
      case 'update':
        return this.updateWidget(widgets, widget);
      case 'delete':
        return this.deleteWidget(widgets, widget);
      default:
        return widgets;
    }
  }

  addWidget(widgets: Widget[], widget: Widget): Widget[] {
    const newWidget = Object.assign({}, widget, { id: uuidv4() });
    return [...widgets, newWidget];
  }

  deleteWidget(widgets: Widget[], widget: Widget): Widget[] {
    return widgets.filter((_widget) => widget.id !== _widget.id);
  }

  updateWidget(widgets: Widget[], widget: Widget): Widget[] {
    return widgets.map((_widget) =>
      widget.id === _widget.id ? Object.assign({}, widget) : _widget
    );
  }

  getTotalPrice(widgets: Widget[]): number {
    return widgets.reduce((acc, curr) => acc + curr.price, 0);
  }
}
